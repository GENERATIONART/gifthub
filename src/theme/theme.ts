/* Design tokens for the Fondly "Luxe" system, transcribed from the handoff README.
   Colors are the single source of truth; components reference `tokens` or the
   themeable accent `var(--g)`. */

export const tokens = {
  bg: {
    app: "#0e0f12",
    appAlt: "#0a0b0d",
    screen: "#15171c",
    card: "#191c22",
    cardAlt: "#1d2026",
    bar: "#101216",
    barAlt: "#0c0d10",
    raised: "#23262d",
  },
  text: {
    primary: "#f3f5f3",
    body: "#eef0ef",
    secondary: "#aeb3b9",
    muted: "#9aa0a7",
    faint: "#767c83",
    faintest: "#6b7178",
  },
  line: {
    standard: "1px solid rgba(220,226,230,.12)",
    subtle: "1px solid rgba(220,226,230,.08)",
    dashed: "1px dashed rgba(220,226,230,.14)",
  },
  font: {
    display: "'Bodoni Moda', serif",
    ui: "'Jost', system-ui, sans-serif",
    mono: "ui-monospace, Menlo, monospace",
  },
} as const;

/** The single themeable brand color. Default = periwinkle. */
export const JEWEL_PRESETS = [
  { hex: "#c9a86a", name: "Gold" },
  { hex: "#d98c5f", name: "Copper" },
  { hex: "#2ecf88", name: "Emerald" },
  { hex: "#3fb8ac", name: "Teal" },
  { hex: "#6aa6f5", name: "Sky" },
  { hex: "#7d8cf0", name: "Periwinkle" },
  { hex: "#b79cf0", name: "Violet" },
  { hex: "#e0719a", name: "Rose" },
  { hex: "#d0556b", name: "Garnet" },
  { hex: "#dab14e", name: "Amber" },
] as const;

/** Preferred default accent (periwinkle). Users can still switch in Settings. */
export const DEFAULT_JEWEL = "#7d8cf0";

/** On accent fills, text/icons use the screen ink color. */
export const ON_ACCENT = "#15171c";

/** Semantic status treatments (fill + text), per handoff. */
export const status = {
  accent: { fill: "var(--g)", text: ON_ACCENT },
  done: { fill: "rgba(110,174,142,.16)", text: "#7fc3a0" },
  plan: { fill: "rgba(220,226,230,.10)", text: "#aeb3b9" },
  quiet: { fill: "rgba(220,226,230,.06)", text: "#767c83" },
  error: { fill: "rgba(201,138,138,.16)", text: "#d99a9a" },
} as const;

export type StatusTone = keyof typeof status;

/** Accent tint background at a given alpha (0..1). */
export const accentTint = (alpha = 0.12) =>
  `color-mix(in srgb, var(--g) ${Math.round(alpha * 100)}%, transparent)`;
