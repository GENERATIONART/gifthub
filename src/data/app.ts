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
export interface InMotion extends HomeMoment {
  status: string;
  tone: Tone;
}

/* -------------------------------------------------------------- refine ---- */
export interface RefineGift extends Axes {
  name: string;
  price: string;
  img: string;
  why: string;
  match: string;
}

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
/* ------------------------------------------------------- notifications ---- */
export interface Notif {
  icon: string;
  tone: "decide" | "info";
  who: string;
  title: string;
  body: string;
  actions: string[];
}
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
/* ------------------------------------------------------------ settings ---- */
export const settingsToggles = [
  { key: "autoApprove", title: "Auto-approve under $40 for saved people", sub: "I'll just buy it and tell you after — no tap needed.", def: true },
  { key: "priceWatch", title: "Buy at the best price automatically", sub: "If a pick drops in price, I lock it in without asking.", def: true },
  { key: "cardSign", title: "Always pair a hand-signed card", sub: "Signed from you and whoever else belongs on it.", def: true },
  { key: "reroute", title: "Reroute or replace late shipments", sub: "If something will miss the date, I fix it silently.", def: false },
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
