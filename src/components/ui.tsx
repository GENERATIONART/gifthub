import type { CSSProperties, ReactNode } from "react";
import type { Tone } from "../data/app";

/* Shared primitives used across screens. */

/** Circular avatar chip. `fg` may be a CSS var like "var(--g)". */
export function Avatar({
  initial,
  bg,
  fg,
  size = 40,
}: {
  initial: string;
  bg: string;
  fg: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        flex: "none",
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        font: `500 ${Math.round(size * 0.4)}px/1 var(--f-display)`,
        background: bg,
        color: fg,
      }}
    >
      {initial}
    </span>
  );
}

const pillBase: CSSProperties = {
  display: "inline-block",
  font: "600 9.5px/1 var(--f-ui)",
  letterSpacing: ".08em",
  textTransform: "uppercase",
  padding: "5px 9px",
  borderRadius: 7,
  flex: "none",
};
const toneMap: Record<Tone, CSSProperties> = {
  accent: { background: "var(--g)", color: "#15171c" },
  done: { background: "rgba(110,174,142,.16)", color: "#7fc3a0" },
  plan: { background: "rgba(220,226,230,.1)", color: "#aeb3b9" },
  quiet: { background: "rgba(220,226,230,.06)", color: "#767c83" },
  error: { background: "rgba(201,138,138,.16)", color: "#d99a9a" },
};
export function StatusPill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span style={{ ...pillBase, ...toneMap[tone] }}>{children}</span>;
}

/** Placeholder image well (until wired to real product imagery). */
export function ImgWell({
  label,
  height,
  style,
  children,
}: {
  label: string;
  height: number | string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        height,
        background: "var(--bg-card-alt)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        font: "500 8px/1.3 var(--f-mono)",
        color: "var(--t-faint)",
        letterSpacing: ".08em",
        textAlign: "center",
        padding: 8,
        ...style,
      }}
    >
      {label}
      {children}
    </div>
  );
}

/** Uppercase section eyebrow label. */
export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        font: "600 10px/1 var(--f-ui)",
        letterSpacing: ".18em",
        textTransform: "uppercase",
        color: "var(--t-faint)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Rounded accent CTA button. */
export function AccentButton({
  children,
  onClick,
  full,
  style,
  as = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  full?: boolean;
  style?: CSSProperties;
  as?: "button" | "div";
}) {
  const s: CSSProperties = {
    display: full ? "flex" : "inline-flex",
    width: full ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    padding: "13px 22px",
    border: "none",
    borderRadius: 999,
    background: "var(--g)",
    color: "#15171c",
    font: "600 14px/1 var(--f-ui)",
    letterSpacing: ".01em",
    cursor: "pointer",
    ...style,
  };
  if (as === "div")
    return (
      <div className="focusring" role="button" tabIndex={0} onClick={onClick} style={s}>
        {children}
      </div>
    );
  return (
    <button className="focusring" onClick={onClick} style={s}>
      {children}
    </button>
  );
}
