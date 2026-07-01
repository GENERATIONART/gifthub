/* ============================================================================
   Seeded application data — the single seam for a real backend.
   Every export maps to a future API resource. Screens import from here only;
   swap these for fetch() calls (Python/FastAPI, Django, Node, …) without
   touching any screen.
   ============================================================================ */

export type Tone = "accent" | "done" | "plan" | "quiet" | "error";

export interface Axes {
  feel: number;
  spend: number;
  form: number;
  risk: number;
}

/* ---------------------------------------------------------------- user ---- */
export const currentUser = {
  name: "David Mercer",
  first: "David",
  initials: "DM",
  plan: "Concierge · Premium",
};

/* ------------------------------------------------------------ left nav ---- */
export interface NavItem {
  key: string;
  icon: string;
  label: string;
  to: string;
  badge?: string;
  /** routes that should keep this item highlighted */
  match?: string[];
}

export const navItems: NavItem[] = [
  { key: "home", icon: "◔", label: "Upcoming", to: "/app" },
  { key: "calendar", icon: "▦", label: "Calendar", to: "/app/calendar" },
  { key: "discover", icon: "✦", label: "Discover", to: "/app/discover" },
  {
    key: "studio",
    icon: "❑",
    label: "Gift studio",
    to: "/app/studio",
    match: ["/app/studio", "/app/refine", "/app/approve", "/app/tracking", "/app/reaction"],
  },
  { key: "memory", icon: "❍", label: "Gift memory", to: "/app/memory" },
  { key: "notifs", icon: "◈", label: "From Fondly", to: "/app/from-fondly", badge: "2" },
];

export interface Person {
  key: string;
  initial: string;
  name: string;
  next: string;
  flag: boolean;
  av: [string, string];
}

export const people: Person[] = [
  { key: "sarah", initial: "S", name: "Sarah", next: "Birthday · 12d", flag: true, av: ["#2a2f37", "var(--g)"] },
  { key: "mom", initial: "M", name: "Mom", next: "Birthday · 18d", flag: true, av: ["#2e2a37", "#b79cf0"] },
  { key: "dad", initial: "D", name: "Dad", next: "Ordered · Fri", flag: false, av: ["#26312b", "#7fc3a0"] },
  { key: "jake", initial: "J", name: "Jake", next: "your son · Mar", flag: false, av: ["#262d35", "#8ba6c4"] },
];

/* ---------------------------------------------------------------- home ---- */
export interface HomeMoment {
  who: string;
  initial: string;
  occasion: string;
  when: string;
  line: string;
  av: [string, string];
  to?: string;
}
export const needsYou: HomeMoment[] = [
  { who: "Sarah", initial: "S", occasion: "Birthday", when: "12 days", line: "10 gifts and 12 dog-themed cards ready for your eyes — pick one and I'll do the rest.", av: ["#2a2f37", "var(--g)"], to: "/app/studio" },
  { who: "Mom", initial: "M", occasion: "Birthday", when: "18 days", line: "I've shortlisted 8. One needs your call before I can book the engraving.", av: ["#2e2a37", "#b79cf0"], to: "/app/studio" },
];
export interface InMotion extends HomeMoment {
  status: string;
  tone: Tone;
}
export const inMotion: InMotion[] = [
  { who: "You & Sarah", initial: "♥", occasion: "Anniversary", line: "Planning a weekend away — comparing two coastal inns.", status: "Planning", tone: "plan", when: "32 days", av: ["#37302a", "#d6a98a"] },
  { who: "Dad", initial: "D", occasion: "Birthday", line: "Whiskey stones ordered — arrives Thursday.", status: "Ordered", tone: "done", when: "this Fri", av: ["#26312b", "#7fc3a0"] },
  { who: "Jake", initial: "J", occasion: "Spring recital", line: "Nothing soon — I'll resurface in February.", status: "Watching", tone: "quiet", when: "—", av: ["#262d35", "#8ba6c4"] },
];

/* ------------------------------------------------------------- profile ---- */
export const profile = {
  name: "Sarah",
  initial: "S",
  relation: "Your wife · together 9 years",
  birthday: "Oct 14",
  birthdayIn: "12d",
  anniversary: "Jun 2",
  loves: ["Ceramics & pottery", "Her garden", "Biscuit (her dog)", "Oat-milk lattes", "Slow Sundays", "Linen everything"],
  avoid: ["Lilies — allergic", "Repeat jewelry", "Fast fashion"],
  circle: [
    { name: "Jake", initial: "J", note: "Your son, 7 — signs her cards too", tag: "Family", av: ["#262d35", "#8ba6c4"] as [string, string] },
    { name: "Biscuit", initial: "🐾", note: "Golden retriever — “signs” the Mother's Day card", tag: "Dog", av: ["#37302a", "#d6a98a"] as [string, string] },
  ],
  history: [
    { year: "'24", gift: "Spa weekend, Sonoma", occasion: "Birthday", price: "$420" },
    { year: "'23", gift: "Gold hoop earrings", occasion: "Anniversary", price: "$180" },
    { year: "'23", gift: "Pottery class, 6 weeks", occasion: "Birthday", price: "$240" },
  ],
  insight: "After the spa weekend last year, I noticed you lean toward experiences — so this year I'm weighting toward something she can keep and touch daily.",
};

/* ------------------------------------------------------------ discover ---- */
export const discoverParsed = [
  { k: "Occasion", v: "Retirement" },
  { k: "For", v: "Dave · coworker" },
  { k: "Loves", v: "Fly-fishing, bourbon" },
  { k: "Milestone", v: "30 years" },
  { k: "Budget", v: "~$80" },
  { k: "Tone", v: "From the team" },
];
export const discoverGifts = [
  { name: "Single-barrel bourbon", price: "$72", img: "[ BOURBON ]", why: "Worth saving for the day he retires." },
  { name: "Hand-tied fly box", price: "$54", img: "[ FLY BOX ]", why: "For the rivers he finally has time for." },
  { name: "Leather river journal", price: "$48", img: "[ JOURNAL ]", why: "Logs every catch. Personal." },
  { name: "Engraved river map", price: "$85", img: "[ RIVER MAP ]", why: "His home water, framed." },
];

/* --------------------------------------------------------------- picks ---- */
export interface Pick {
  id: string;
  name: string;
  price: string;
  img: string;
  why: string;
  top?: boolean;
}
export const picks: Pick[] = [
  { id: "g0", name: "Hand-thrown planter set", price: "$68", img: "[ STONEWARE PLANTER ]", why: "Her ceramics and garden in one object.", top: true },
  { id: "g1", name: "Biscuit oil portrait", price: "$90", img: "[ PET PORTRAIT ]", why: "Hand-painted from your photo — the one she'd cry at." },
  { id: "g2", name: "Pottery weekend retreat", price: "$240", img: "[ POTTERY RETREAT ]", why: "Two days at the wheel, just her." },
  { id: "g3", name: "Walnut garden tools", price: "$72", img: "[ WALNUT TOOLS ]", why: "Retires that bent old trowel." },
  { id: "g4", name: "Glazed dog bowl", price: "$40", img: "[ CERAMIC DOG BOWL ]", why: "For Biscuit — truly for her." },
  { id: "g5", name: "Monthly clay club", price: "$45", img: "[ CLAY OF THE MONTH ]", why: "A small delight every month." },
];

/* -------------------------------------------------------------- refine ---- */
export interface RefineGift extends Axes {
  name: string;
  price: string;
  img: string;
  why: string;
  match: string;
}
export const refinePool: RefineGift[] = [
  { name: "Biscuit oil portrait", price: "$90", img: "[ PET PORTRAIT ]", why: "Hand-painted from your photo — the one she'd actually cry at.", match: "sentimental · ready", feel: 1, spend: 1, form: -1, risk: 1 },
  { name: "Pottery weekend retreat", price: "$240", img: "[ POTTERY RETREAT ]", why: "Two days at the wheel in Sonoma — an experience, squarely her craft.", match: "experience · splurge", feel: 1, spend: 1, form: 1, risk: 0 },
  { name: "Private glaze masterclass", price: "$120", img: "[ GLAZE CLASS ]", why: "A maker's evening with a local potter. Unexpected and deeply her.", match: "experience · surprising", feel: 1, spend: 1, form: 1, risk: 1 },
  { name: "Hand-thrown planter set", price: "$68", img: "[ PLANTER ]", why: "Ceramics and garden in one object. The safe, sure-thing keepsake.", match: "keepsake · safe", feel: 0, spend: 0, form: -1, risk: -1 },
  { name: "Glazed dog bowl", price: "$40", img: "[ DOG BOWL ]", why: "For Biscuit, truly for her. Sentimental and ready to gift.", match: "sentimental · budget", feel: 1, spend: -1, form: -1, risk: 0 },
  { name: "Monthly clay club", price: "$45", img: "[ CLAY CLUB ]", why: "A year of her favourite material, one delivery a month.", match: "experience · ongoing", feel: 0, spend: 0, form: 1, risk: 1 },
  { name: "Walnut garden tools", price: "$72", img: "[ WALNUT TOOLS ]", why: "Retires that bent old trowel. Practical and hard-wearing.", match: "practical · keepsake", feel: -1, spend: 0, form: -1, risk: -1 },
];
export const scoreGift = (p: Axes, d: Axes) =>
  -(Math.abs(p.feel - d.feel) + Math.abs(p.spend - d.spend) + Math.abs(p.form - d.form) + Math.abs(p.risk - d.risk));

export const refineDials: { axis: keyof Axes; title: string; names: [string, string, string] }[] = [
  { axis: "feel", title: "Feel", names: ["Practical", "Either", "Sentimental"] },
  { axis: "spend", title: "Spend", names: ["Budget", "Mid", "Splurge"] },
  { axis: "form", title: "Form", names: ["Keepsake", "Mix", "Experience"] },
  { axis: "risk", title: "Risk", names: ["Safe", "Open", "Surprising"] },
];

/* ------------------------------------------------------------- approve ---- */
export const approveLogistics = [
  { label: "Ship to", value: "Sarah · home" },
  { label: "Arrives", value: "Sat, Oct 12" },
  { label: "Gift wrap", value: "Included" },
];
export const approveAssure = [
  { icon: "↺", label: "I handle returns" },
  { icon: "◷", label: "2 days of slack" },
  { icon: "♥", label: "Card hand-signed" },
];

/* ------------------------------------------------------------ tracking ---- */
export interface TrackStep {
  st: "done" | "active" | "future";
  title: string;
  detail: string;
  when: string;
  last?: boolean;
}
export const trackSteps: TrackStep[] = [
  { st: "done", title: "Approved & ordered", detail: "Single-use card charged $74.00", when: "Mon" },
  { st: "done", title: "Card hand-signed & paired", detail: "From you, Jake & Biscuit", when: "Tue" },
  { st: "active", title: "In transit", detail: "Left Portland facility · on schedule", when: "Now" },
  { st: "future", title: "Arrives at Sarah's", detail: "2 days before her birthday", when: "Sat", last: true },
];
export const trackConcierge = [
  { icon: "↺", title: "Doesn't fit the moment?", sub: "I'll return it and send an alternative" },
  { icon: "◷", title: "Need it sooner?", sub: "I can upgrade to overnight, no charge" },
  { icon: "✎", title: "Change the card message", sub: "Still editable until Thursday" },
];

/* ------------------------------------------------------------ reaction ---- */
export const reactionDefs = [
  { key: "loved", emoji: "♥", title: "She loved it", sub: "Landed exactly right", ring: "var(--g)", tint: "rgba(201,168,106,.14)" },
  { key: "liked", emoji: "◒", title: "She liked it", sub: "Good, not a showstopper", ring: "#8ba6c4", tint: "rgba(139,166,196,.14)" },
  { key: "missed", emoji: "◌", title: "Missed the mark", sub: "The most useful thing you can tell me", ring: "#c98a8a", tint: "rgba(201,138,138,.14)" },
] as const;
export type ReactionKey = (typeof reactionDefs)[number]["key"];

export const reactionLearned: Record<ReactionKey, string> = {
  loved: "A keeper that ties to something she does — that's her language. I'll weight ceramics and hands-on gifts higher, and lean toward things she can keep and touch.",
  liked: "Solidly her, but not a spark. I'll keep ceramics in the mix and push for a fresher angle next time — maybe an experience over an object.",
  missed: "Thank you — genuinely. I'll steer away from this direction for her and recalibrate. Nothing sharpens me faster than an honest miss.",
};
export const reactionTags: Record<ReactionKey, [string, string][]> = {
  loved: [["Ceramics ↑", "var(--g)"], ["Keepsakes ↑", "var(--g)"]],
  liked: [["Ceramics ~", "#8ba6c4"], ["Try experiences", "#8ba6c4"]],
  missed: [["This angle ↓", "#c98a8a"], ["Recalibrating", "#c98a8a"]],
};

/* ------------------------------------------------------------ calendar ---- */
export interface CalOcc {
  d: string;
  who: string;
  tone: "gold" | "soft";
}
export interface CalMonth {
  m: string;
  occ: CalOcc[];
  now?: boolean;
}
export const calendarMonths: CalMonth[] = [
  { m: "Jan", occ: [] },
  { m: "Feb", occ: [{ d: "14", who: "Valentine's", tone: "soft" }] },
  { m: "Mar", occ: [{ d: "09", who: "Jake · recital", tone: "soft" }] },
  { m: "Apr", occ: [] },
  { m: "May", occ: [{ d: "11", who: "Mother's Day", tone: "soft" }] },
  { m: "Jun", occ: [{ d: "02", who: "Anniversary", tone: "gold" }] },
  { m: "Jul", occ: [] },
  { m: "Aug", occ: [{ d: "22", who: "Dad · birthday", tone: "soft" }] },
  { m: "Sep", occ: [] },
  { m: "Oct", occ: [{ d: "14", who: "Sarah 🎂", tone: "gold" }, { d: "20", who: "Mom 🎂", tone: "gold" }], now: true },
  { m: "Nov", occ: [] },
  { m: "Dec", occ: [{ d: "25", who: "Holidays", tone: "soft" }, { d: "31", who: "Jake · NYE", tone: "soft" }] },
];

/* ------------------------------------------------------------- history ---- */
export const histStats = [
  { value: "12", label: "Gifts given" },
  { value: "$2,140", label: "Over 3 years" },
  { value: "0", label: "Repeats — ever" },
];
export const avatarMap: Record<string, [string, [string, string]]> = {
  Sarah: ["S", ["#2a2f37", "var(--g)"]],
  Mom: ["M", ["#2e2a37", "#b79cf0"]],
  Dad: ["D", ["#26312b", "#7fc3a0"]],
  Jake: ["J", ["#262d35", "#8ba6c4"]],
};
export interface LedgerItem {
  date: string;
  who: string;
  gift: string;
  occ: string;
  price: string;
  react: "loved" | "liked";
}
export const ledger: { year: string; items: LedgerItem[] }[] = [
  { year: "2025", items: [
    { date: "Jun 2", who: "Sarah", gift: "Weekend in Mendocino", occ: "Anniversary", price: "$540", react: "loved" },
    { date: "May 11", who: "Mom", gift: "Silk scarf, hand-dyed", occ: "Mother's Day", price: "$120", react: "loved" },
  ] },
  { year: "2024", items: [
    { date: "Oct 14", who: "Sarah", gift: "Spa weekend, Sonoma", occ: "Birthday", price: "$420", react: "loved" },
    { date: "Aug 22", who: "Dad", gift: "Whiskey decanter set", occ: "Birthday", price: "$95", react: "liked" },
    { date: "Jun 2", who: "Sarah", gift: "Gold hoop earrings", occ: "Anniversary", price: "$180", react: "loved" },
  ] },
  { year: "2023", items: [
    { date: "Oct 14", who: "Sarah", gift: "Pottery class, 6 weeks", occ: "Birthday", price: "$240", react: "loved" },
    { date: "Dec 25", who: "Jake", gift: "Wooden train set", occ: "Holidays", price: "$60", react: "loved" },
  ] },
];
export const histInsights = [
  "You lean toward experiences for Sarah — but keepsakes for Mom. I weight each person's picks accordingly.",
  "Your gifts cluster around $60–$180. I flag anything that drifts far from your norm before you commit.",
  "Anniversaries get the splurge; birthdays stay considered. Noted, and applied.",
];

/* ------------------------------------------------------- notifications ---- */
export interface Notif {
  icon: string;
  tone: "decide" | "info";
  who: string;
  title: string;
  body: string;
  actions: string[];
}
export const notifGroups: { label: string; items: Notif[] }[] = [
  { label: "Today", items: [
    { icon: "✦", tone: "decide", who: "Sarah", title: "She mentioned wanting a pottery wheel", body: "In your chat on Sunday. It's $310 — above her birthday budget, but I can frame it as a joint gift from you and Jake. Want me to price it out?", actions: ["Yes, price it", "Not now"] },
    { icon: "↓", tone: "info", who: "Clay & Kiln", title: "Price dropped on the planter set", body: "Now $59, down from $68. I already locked the lower price on Sarah's order — nothing for you to do.", actions: ["Nice"] },
  ] },
  { label: "Earlier this week", items: [
    { icon: "♥", tone: "decide", who: "Mom", title: "One pick needs your call", body: "The engraving on Mom's frame adds two days. Approve it, or I'll switch to the non-engraved version to stay ahead of her birthday.", actions: ["Approve engraving", "Switch instead"] },
    { icon: "◷", tone: "info", who: "Dad", title: "Whiskey stones shipped", body: "Arrives Thursday, a day early. I'll keep watching in case it slips.", actions: ["View tracking"] },
    { icon: "◔", tone: "info", who: "You & Sarah", title: "Found two coastal inns", body: "Both are free your anniversary weekend. I'm holding a room at each for 48 hours while you look.", actions: ["See both"] },
  ] },
];

/* -------------------------------------------------------------- alerts ---- */
export interface Alert {
  severity: "high" | "low";
  icon: string;
  tag: string;
  who: string;
  title: string;
  body: string;
  fix: string;
  actions: { label: string; primary?: boolean }[];
}
export const alerts: Alert[] = [
  { severity: "high", icon: "⊘", tag: "Payment", who: "Sarah's planter", title: "Your card declined the charge", body: "The bank flagged the $74 single-use card as unusual — it happens with virtual cards. Her gift is paused, not lost.", fix: "I can retry now, or switch to your backup Amex ending 8842. Either keeps her on schedule.", actions: [{ label: "Use backup card", primary: true }, { label: "Retry Visa" }] },
  { severity: "high", icon: "◱", tag: "Out of stock", who: "Mom's frame", title: "The frame sold out before I ordered", body: "The monogrammed frame is gone for now. I found two near-identical alternatives from makers I trust, both in her budget.", fix: "The closest match is $8 less and ships a day sooner. Want me to swap to it?", actions: [{ label: "Swap to it", primary: true }, { label: "See both" }] },
  { severity: "low", icon: "◷", tag: "Delivery at risk", who: "Dad's whiskey stones", title: "A storm may delay it past his birthday", body: "The carrier pushed the estimate to the 23rd — one day late. I don't like cutting it close.", fix: "I've found the same set with overnight from another seller, at no extra cost to you. Reroute?", actions: [{ label: "Reroute it", primary: true }, { label: "Let it ride" }] },
  { severity: "low", icon: "⌖", tag: "Address", who: "Dad (Robert)", title: "I don't have a confirmed address", body: "Before I can ship Dad's gift I need to know it's going to the right place — the one on file is two years old.", fix: "Confirm his address or send him a private link to fill it in himself. Takes him ten seconds.", actions: [{ label: "Text Dad a link", primary: true }, { label: "Enter it myself" }] },
];

/* ------------------------------------------------------------ settings ---- */
export const settingsToggles = [
  { key: "autoApprove", title: "Auto-approve under $40 for saved people", sub: "I'll just buy it and tell you after — no tap needed.", def: true },
  { key: "priceWatch", title: "Buy at the best price automatically", sub: "If a pick drops in price, I lock it in without asking.", def: true },
  { key: "cardSign", title: "Always pair a hand-signed card", sub: "Signed from you and whoever else belongs on it.", def: true },
  { key: "reroute", title: "Reroute or replace late shipments", sub: "If something will miss the date, I fix it silently.", def: false },
];
export const settingsAddresses = [
  { name: "Sarah Mercer", line: "Home · 4014 Juniper Ln, Portland", initial: "S", verified: true, av: ["#2a2f37", "var(--g)"] as [string, string] },
  { name: "Mom (Ellen)", line: "22 Wren Ct, Santa Rosa", initial: "M", verified: true, av: ["#2e2a37", "#b79cf0"] as [string, string] },
  { name: "Dad (Robert)", line: "Needs confirmation before Aug", initial: "D", verified: false, av: ["#26312b", "#7fc3a0"] as [string, string] },
];

/* --------------------------------------------------------------- empty ---- */
export const setupSteps = [
  { num: "1", title: "Add someone you gift often", sub: "A name and a birthday is enough for me to begin.", cta: "＋", to: "/app" },
  { num: "2", title: "Connect your calendar & contacts", sub: "I'll pull in birthdays and anniversaries automatically.", cta: "⟳", to: "/app" },
  { num: "3", title: "Tell me about an occasion coming up", sub: "Describe it in plain words — I'll take it from there.", cta: "✦", to: "/app/discover" },
];

/* -------------------------------------------- right AI panel (per screen) -- */
export interface PanelItem {
  st: "done" | "work";
  text: string;
  meta?: string;
}
export interface PanelData {
  actions: string[];
  items: PanelItem[];
  sources: string[];
}
export const panels: Record<string, PanelData> = {
  home: {
    actions: ["Scanning 14 tracked dates for anything that needs you this week…", "Comparing two coastal inns for your anniversary weekend…", "Watching Dad's whiskey-stone shipment — on time for Thursday."],
    items: [
      { st: "done", text: "Pulled 14 important dates from your contacts & chats", meta: "4 people active this quarter" },
      { st: "done", text: "Pre-built Sarah's birthday shortlist", meta: "10 gifts · 12 cards" },
      { st: "done", text: "Ordered Dad's gift before the price rose", meta: "saved $11" },
      { st: "work", text: "Planning your anniversary weekend", meta: "comparing 2 inns + dinner" },
      { st: "work", text: "Holding for your 2 decisions", meta: "Sarah & Mom" },
    ],
    sources: ["Your contacts", "Past 9 yrs of gifts", "Chat history"],
  },
  profile: {
    actions: ["Re-reading your chats for new things Sarah's mentioned lately…", "Cross-checking past gifts so nothing repeats…"],
    items: [
      { st: "done", text: "Built Sarah's taste profile", meta: "6 loves · 3 to avoid" },
      { st: "done", text: "Mapped her circle", meta: "Jake + Biscuit sign cards" },
      { st: "done", text: "Logged 3 past gifts to avoid repeats" },
      { st: "work", text: "Noticing a shift toward keepsakes over experiences", meta: "weighting this year's picks" },
    ],
    sources: ["Chat history", "Gift log", "Shared calendar"],
  },
  discover: {
    actions: ["Searching 40+ makers for Dave's flask & fly match…", "Checking engraving lead times against the retirement date…"],
    items: [
      { st: "done", text: "Parsed your request into 6 signals", meta: "fly-fishing · bourbon · 30 yrs" },
      { st: "done", text: "Vetted 40 makers, filtered to 5", meta: "all under $90, ship in time" },
      { st: "work", text: "Confirming the engraving can read “30 years, from the team”", meta: "2 of 5 support it" },
    ],
    sources: ["Maker network", "Reviews", "Lead-time data"],
  },
  studio: {
    actions: ["Ranking 40 vetted gifts against Sarah's profile…", "Pairing each gift with a dog-themed card she'd love…"],
    items: [
      { st: "done", text: "Vetted 40 gifts against her profile", meta: "kept the top 10" },
      { st: "done", text: "Matched 12 dog-themed cards", meta: "for the Biscuit signature" },
      { st: "done", text: "Confirmed all arrive before Oct 14" },
      { st: "work", text: "Watching for a better price on the planter set", meta: "checking 3 sellers" },
    ],
    sources: ["Her taste profile", "40 vetted gifts", "Delivery estimates"],
  },
  refine: {
    actions: ["Re-ranking all 40 gifts around your steer…", "Re-checking stock & delivery for the new top picks…"],
    items: [
      { st: "done", text: "Re-ranked 40 gifts to your dials" },
      { st: "done", text: "Re-verified delivery for new picks" },
      { st: "work", text: "Sourcing 3 more that fit your direction", meta: "sentimental · splurge" },
    ],
    sources: ["Your dial settings", "40 vetted gifts", "Live stock"],
  },
  approve: {
    actions: ["Locking a single-use card to exactly this order…", "Reserving the planter and holding the engraving slot…"],
    items: [
      { st: "done", text: "Reserved the planter set + dog card", meta: "held for 30 min" },
      { st: "done", text: "Prepared a single-use card", meta: "hard cap $74 · locks after" },
      { st: "done", text: "Confirmed Oct 12 delivery to Sarah" },
      { st: "work", text: "Waiting on your approval to send", meta: "one tap" },
    ],
    sources: ["Fondly Pay", "Clay & Kiln Studio", "Carrier estimate"],
  },
  tracking: {
    actions: ["Watching the shipment from Portland — on schedule…", "Holding 2 days of slack in case it slips…"],
    items: [
      { st: "done", text: "Charged $74 to the single-use card" },
      { st: "done", text: "Hand-signed & paired the card", meta: "you, Jake & Biscuit" },
      { st: "work", text: "Tracking the package", meta: "left Portland · ETA Sat" },
      { st: "work", text: "Will nudge you the morning it lands", meta: "so you can hand it to her" },
    ],
    sources: ["Carrier API", "Clay & Kiln Studio", "Sarah's calendar"],
  },
  reaction: {
    actions: ["Ready to fold your reaction into her taste model…", "Cross-checking what worked before for her…"],
    items: [
      { st: "done", text: "Delivered Saturday, two days early" },
      { st: "done", text: "Logged the gift to her memory" },
      { st: "work", text: "Waiting to learn how it landed", meta: "one tap retrains her model" },
    ],
    sources: ["Gift log", "Her taste profile"],
  },
  calendar: {
    actions: ["Scanning 8 people for dates I might be missing…", "Cross-referencing your calendar for conflicts…"],
    items: [
      { st: "done", text: "Tracking 14 dates across 8 people", meta: "pulled from contacts + chats" },
      { st: "done", text: "Flagged the 2 that need you first", meta: "Sarah, then Mom" },
      { st: "work", text: "Watching for new dates you mention", meta: "I add them automatically" },
    ],
    sources: ["Your calendar", "Contacts", "Chat history"],
  },
  memory: {
    actions: ["Re-reading past gifts so I never repeat one…", "Learning your taste from what worked before…"],
    items: [
      { st: "done", text: "Logged 12 gifts across 3 years", meta: "$2,140 total" },
      { st: "done", text: "Zero repeats, ever", meta: "I check every pick against this" },
      { st: "work", text: "Refining each person's taste model", meta: "experiences vs. keepsakes" },
    ],
    sources: ["Gift log", "Reactions you logged", "Receipts"],
  },
  notifs: {
    actions: ["Deciding which observations are worth your time…", "Handling the rest so I don't interrupt you…"],
    items: [
      { st: "done", text: "Surfaced 2 things that need a decision" },
      { st: "done", text: "Handled 6 others silently this week", meta: "price drops, a reroute…" },
      { st: "work", text: "Watching Sarah's chat for gift signals", meta: "the pottery-wheel mention" },
    ],
    sources: ["Your chats", "Order status", "Price watch"],
  },
  alerts: {
    actions: ["Pre-computing a fix for every issue before I show it…", "Never a dead end — always a next step ready…"],
    items: [
      { st: "done", text: "Caught 4 issues before they reached you" },
      { st: "done", text: "Paused anything at risk of double-charging" },
      { st: "work", text: "Holding each order until you choose a fix" },
    ],
    sources: ["Fondly Pay", "Carrier API", "Live stock & price"],
  },
  settings: {
    actions: ["Applying your rules to everything in motion…", "Re-checking what I can act on without asking…"],
    items: [
      { st: "done", text: "Your guardrails are set", meta: "auto-approve under $40" },
      { st: "done", text: "Single-use card ready for every order" },
      { st: "work", text: "Operating inside your budget on 3 gifts" },
    ],
    sources: ["Your rules", "Fondly Pay", "Per-person budgets"],
  },
  empty: {
    actions: ["Ready when you are — add someone and I'll start…", "I learn fastest from your first person + a date…"],
    items: [
      { st: "work", text: "Waiting for your first person", meta: "then I get to work" },
      { st: "work", text: "I'll import dates from your calendar" },
      { st: "work", text: "I'll build a taste profile as we chat" },
    ],
    sources: ["Nothing yet — that's about to change"],
  },
};
