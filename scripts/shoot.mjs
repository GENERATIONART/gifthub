// Screenshot + overflow-measurement helper. Drives the system Chrome.
// Usage: node scripts/shoot.mjs <url> <width> <height> <outPath> [measure]
import puppeteer from "puppeteer-core";

const [, , url, w = "1440", h = "900", out = "/tmp/shot.png", measure] = process.argv;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
await new Promise((r) => setTimeout(r, 500));

if (measure) {
  const data = await page.evaluate((vw) => {
    const de = document.documentElement;
    const offenders = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width > 40) {
        offenders.push({
          tag: el.tagName,
          cls: (el.className && el.className.toString().slice(0, 40)) || "",
          right: Math.round(r.right),
          width: Math.round(r.width),
        });
      }
    });
    offenders.sort((a, b) => b.right - a.right);
    return { scrollW: de.scrollWidth, clientW: de.clientWidth, top: offenders.slice(0, 8) };
  }, +w);
  console.log("viewport", w, "scrollWidth", data.scrollW, "clientWidth", data.clientW);
  console.log("overflowing elements:");
  for (const o of data.top) console.log(`  <${o.tag}> .${o.cls}  right=${o.right} w=${o.width}`);
}

await page.screenshot({ path: out });
await browser.close();
