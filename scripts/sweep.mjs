// Final verification sweep: visit every route, capture console errors + overflow.
import puppeteer from "puppeteer-core";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SD = process.argv[2];
const wOverride = process.argv[3] ? +process.argv[3] : null;
const base = "http://localhost:5173";

const routes = [
  ["/", 1440, 1600, "sw_landing"],
  ["/auth", 1440, 900, "sw_auth"],
  ["/onboarding", 1440, 900, "sw_onboarding"],
  ["/app", 1440, 900, "sw_home"],
  ["/app/calendar", 1440, 900, "sw_calendar"],
  ["/app/discover", 1440, 900, "sw_discover"],
  ["/app/studio", 1440, 900, "sw_studio"],
  ["/app/refine", 1440, 900, "sw_refine"],
  ["/app/approve", 1440, 900, "sw_approve"],
  ["/app/tracking", 1440, 900, "sw_tracking"],
  ["/app/reaction", 1440, 900, "sw_reaction"],
  ["/app/memory", 1440, 900, "sw_memory"],
  ["/app/from-fondly", 1440, 900, "sw_notifs"],
  ["/app/alerts", 1440, 900, "sw_alerts"],
  ["/app/settings", 1440, 1000, "sw_settings"],
  ["/app/profile/sarah", 1440, 1000, "sw_profile"],
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"] });
let anyError = false;
for (const [route, w, h, name] of routes) {
  const page = await browser.newPage();
  const errs = [];
  page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  page.on("pageerror", (e) => errs.push(String(e)));
  const vw = wOverride ?? w;
  await page.setViewport({ width: vw, height: h, deviceScaleFactor: 1 });
  await page.goto(base + route, { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 400));
  // True horizontal-scroll test: does the document scroll wider than the viewport?
  const of = await page.evaluate(() => {
    const de = document.documentElement;
    return de.scrollWidth > de.clientWidth ? de.scrollWidth - de.clientWidth : 0;
  });
  if (SD) await page.screenshot({ path: `${SD}/${name}.png` });
  const flag = errs.length || of ? "  ⚠" : "  ok";
  if (errs.length || of) anyError = true;
  console.log(`${flag}  ${route.padEnd(22)} errors=${errs.length} overflow=${of}${errs.length ? " :: " + errs[0].slice(0, 80) : ""}`);
  await page.close();
}
await browser.close();
console.log(anyError ? "\nSWEEP: issues found" : "\nSWEEP: all clean ✓");
