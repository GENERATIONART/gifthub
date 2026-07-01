import { useState } from "react";
import { Eyebrow } from "../../components/ui";
import { reactionDefs, reactionLearned, reactionTags, type ReactionKey } from "../../data/app";

export function Reaction() {
  const [reaction, setReaction] = useState<ReactionKey | null>(null);
  const [saved, setSaved] = useState(false);

  return (
    <div className="screen" style={{ animation: "fadeUp .4s ease both" }}>
      <div style={{ font: "500 11px/1 var(--f-ui)", letterSpacing: ".2em", textTransform: "uppercase", color: "#7fc3a0", marginBottom: 13 }}>
        Delivered Saturday · she has it
      </div>
      <h1 className="hero hero-lg" style={{ margin: "0 0 8px" }}>
        So — how did it <i>land</i>?
      </h1>
      <p className="lede" style={{ maxWidth: "54ch" }}>
        One tap is all I need. It's the single most useful thing you can tell me — it sharpens every
        gift I choose for her after this.
      </p>

      <div className="split" style={{ marginTop: 30 }}>
        {/* left: gift + options */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 15, padding: "16px 17px", borderRadius: 16, background: "var(--bg-card)", border: "var(--line-subtle)", marginBottom: 22 }}>
            <div
              style={{
                width: 52,
                height: 52,
                flex: "none",
                borderRadius: 11,
                background: "var(--bg-card-alt)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                font: "500 7px/1.3 var(--f-mono)",
                color: "var(--t-faint)",
                textAlign: "center",
                padding: 5,
              }}
            >
              STONEWARE SET
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: "500 15px/1.15 var(--f-ui)", color: "var(--t-primary)" }}>Hand-thrown planter set</div>
              <div style={{ font: "400 12px/1.3 var(--f-ui)", color: "#888e95", marginTop: 3 }}>Her ceramics & garden, in one</div>
            </div>
            <span style={{ font: "500 13px/1 var(--f-display)", color: "var(--g)" }}>$74</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {reactionDefs.map((o) => {
              const on = reaction === o.key;
              return (
                <button
                  key={o.key}
                  onClick={() => {
                    setReaction(o.key);
                    setSaved(false);
                  }}
                  className="focusring"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 15,
                    padding: "17px",
                    borderRadius: 16,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all .18s",
                    background: on ? o.tint : "var(--bg-card)",
                    border: `1px solid ${on ? o.ring : "rgba(220,226,230,.1)"}`,
                    boxShadow: on ? `0 0 0 1px ${o.ring}` : undefined,
                  }}
                >
                  <span
                    style={{
                      width: 42,
                      height: 42,
                      flex: "none",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      transition: "all .18s",
                      background: on ? o.ring : "rgba(220,226,230,.07)",
                      color: on ? "#15171c" : o.ring,
                    }}
                  >
                    {o.emoji}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ font: "500 16px/1.15 var(--f-ui)", color: "var(--t-primary)" }}>{o.title}</div>
                    <div style={{ font: "400 12.5px/1.35 var(--f-ui)", color: "#888e95", marginTop: 3 }}>{o.sub}</div>
                  </div>
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      flex: "none",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      ...(on ? { background: o.ring, color: "#15171c" } : { border: "1.5px solid #3a3f47", color: "transparent" }),
                    }}
                  >
                    {on ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => reaction && setSaved(true)}
            disabled={!reaction}
            className="focusring"
            style={{
              marginTop: 20,
              width: "100%",
              textAlign: "center",
              padding: 16,
              borderRadius: 14,
              border: "none",
              font: "600 14px/1 var(--f-ui)",
              transition: "all .2s",
              ...(reaction
                ? saved
                  ? { background: "rgba(110,174,142,.16)", color: "#7fc3a0", cursor: "default" }
                  : { background: "var(--g)", color: "#15171c", cursor: "pointer" }
                : { background: "var(--surface-raised)", color: "var(--t-dim)", cursor: "default" }),
            }}
          >
            {saved ? "✓ Saved to her memory" : "Save to Sarah's memory"}
          </button>
          {saved && (
            <div style={{ marginTop: 12, textAlign: "center", font: "400 13px/1.4 var(--f-ui)", color: "#7fc3a0" }}>
              ✓ Logged to Sarah's gift memory — I won't repeat it.
            </div>
          )}
        </div>

        {/* right: what this teaches me */}
        <div>
          <Eyebrow style={{ marginBottom: 14 }}>What this teaches me</Eyebrow>
          {reaction ? (
            <div style={{ padding: 22, borderRadius: 18, background: "rgba(201,168,106,.07)", border: "1px solid rgba(201,168,106,.24)", animation: "fadeUp .4s ease both" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 13 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    flex: "none",
                    borderRadius: "50%",
                    border: "1px solid var(--g)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--g)",
                    font: "400 14px/1 var(--f-display)",
                  }}
                >
                  f
                </div>
                <span style={{ font: "600 10px/1 var(--f-ui)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--g)" }}>What I learned</span>
              </div>
              <div style={{ font: "500 16px/1.55 var(--f-display)", fontStyle: "italic", color: "#e6e8e6" }}>{reactionLearned[reaction]}</div>
              <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {reactionTags[reaction].map(([label, color]) => (
                  <span
                    key={label}
                    style={{
                      font: "600 11px/1 var(--f-ui)",
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: `color-mix(in srgb, ${color} 13%, transparent)`,
                      color,
                      border: `1px solid color-mix(in srgb, ${color} 27%, transparent)`,
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ padding: "26px 22px", borderRadius: 18, border: "1px dashed rgba(220,226,230,.16)", textAlign: "center" }}>
              <div style={{ font: "400 15px/1.55 var(--f-display)", fontStyle: "italic", color: "var(--t-faint)" }}>
                Pick a reaction and I'll show you exactly how it changes what I choose for her next.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
