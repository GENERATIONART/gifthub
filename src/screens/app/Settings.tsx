import { useState } from "react";
import { Avatar, Eyebrow } from "../../components/ui";
import { settingsToggles, settingsAddresses } from "../../data/app";
import { JEWEL_PRESETS } from "../../theme/theme";
import { useTheme } from "../../theme/ThemeProvider";

export function Settings() {
  const { jewel, setJewel } = useTheme();
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    () => Object.fromEntries(settingsToggles.map((t) => [t.key, t.def])),
  );

  return (
    <div className="screen" style={{ maxWidth: 840 }}>
      <div className="eyebrow-accent">Your rules</div>
      <h1 className="hero" style={{ margin: "14px 0 8px" }}>
        How much rope <i>I get</i>.
      </h1>
      <p className="lede" style={{ maxWidth: "54ch" }}>
        Set the guardrails once. Inside them I act on my own; outside them I always ask first.
      </p>

      {/* budget */}
      <Eyebrow style={{ margin: "34px 0 14px" }}>Budget &amp; spending</Eyebrow>
      <div style={{ padding: 22, borderRadius: 18, background: "var(--bg-card)", border: "1px solid rgba(220,226,230,.09)", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ font: "500 14px/1 var(--f-ui)", color: "var(--t-body)" }}>Default gift budget</span>
          <span style={{ font: "400 22px/1 var(--f-display)", color: "var(--g)" }}>$80</span>
        </div>
        <div style={{ height: 6, borderRadius: 999, background: "var(--bg-screen)", position: "relative", marginBottom: 9 }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "42%", borderRadius: 999, background: "var(--g)" }} />
          <div style={{ position: "absolute", left: "42%", top: "50%", width: 16, height: 16, borderRadius: "50%", background: "var(--g)", transform: "translate(-50%,-50%)", boxShadow: "0 2px 6px rgba(0,0,0,.4)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", font: "400 11px/1 var(--f-ui)", color: "var(--t-faintest)" }}>
          <span>$25</span>
          <span>$400</span>
        </div>
        <p style={{ margin: "15px 0 0", font: "400 12.5px/1.5 var(--f-ui)", color: "#888e95" }}>
          Per-person budgets override this — Sarah's birthday is set to $200, Jake's to $60.
        </p>
      </div>

      {/* auto-approve */}
      <Eyebrow style={{ marginBottom: 14 }}>Auto-approve · what I can do without asking</Eyebrow>
      <div style={{ borderRadius: 18, overflow: "hidden", background: "var(--bg-card)", border: "1px solid rgba(220,226,230,.09)", marginBottom: 28 }}>
        {settingsToggles.map((t, i) => {
          const on = toggles[t.key];
          return (
            <div key={t.key} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", ...(i < settingsToggles.length - 1 ? { borderBottom: "var(--line-faint)" } : {}) }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: "500 14px/1.2 var(--f-ui)", color: "var(--t-body)" }}>{t.title}</div>
                <div style={{ font: "400 12px/1.4 var(--f-ui)", color: "#888e95", marginTop: 4 }}>{t.sub}</div>
              </div>
              <button
                onClick={() => setToggles((s) => ({ ...s, [t.key]: !s[t.key] }))}
                role="switch"
                aria-checked={on}
                aria-label={t.title}
                className="focusring"
                style={{
                  width: 44,
                  height: 26,
                  flex: "none",
                  borderRadius: 999,
                  cursor: "pointer",
                  padding: 3,
                  border: "none",
                  transition: "all .2s",
                  display: "flex",
                  alignItems: "center",
                  background: on ? "var(--g)" : "#2a2f37",
                  justifyContent: on ? "flex-end" : "flex-start",
                }}
              >
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#f3f5f3", display: "block", boxShadow: "0 1px 3px rgba(0,0,0,.4)" }} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="split-even">
        {/* address book */}
        <div>
          <Eyebrow style={{ marginBottom: 14 }}>Address book</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {settingsAddresses.map((a) => (
              <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 16px", background: "var(--bg-card)", border: "var(--line-subtle)", borderRadius: 14 }}>
                <Avatar initial={a.initial} bg={a.av[0]} fg={a.av[1]} size={34} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "500 13.5px/1.15 var(--f-ui)", color: "var(--t-body)" }}>{a.name}</div>
                  <div style={{ font: "400 11.5px/1.3 var(--f-ui)", color: a.verified ? "#888e95" : "#d99a9a", marginTop: 3 }}>{a.line}</div>
                </div>
                {a.verified ? (
                  <span style={{ font: "600 12px/1 var(--f-ui)", color: "#7fc3a0", flex: "none" }}>✓</span>
                ) : (
                  <span style={{ font: "600 9px/1 var(--f-ui)", letterSpacing: ".06em", textTransform: "uppercase", color: "#d99a9a", background: "rgba(201,138,138,.16)", padding: "4px 8px", borderRadius: 6, flex: "none" }}>
                    Confirm
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* fondly pay */}
        <div>
          <Eyebrow style={{ marginBottom: 14 }}>Fondly Pay</Eyebrow>
          <div style={{ borderRadius: 18, padding: 20, background: "linear-gradient(135deg,#20242c,#15171c)", border: "var(--line)", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <span style={{ font: "600 10px/1 var(--f-ui)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--g)" }}>Primary</span>
              <span style={{ font: "500 11px/1 var(--f-ui)", color: "#888e95" }}>Visa</span>
            </div>
            <div style={{ font: "400 15px/1 var(--f-display)", letterSpacing: ".14em", color: "var(--t-body)" }}>•••• •••• •••• 4014</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, font: "400 11px/1 var(--f-ui)", color: "#888e95" }}>
              <span>David Mercer</span>
              <span>08 / 28</span>
            </div>
          </div>
          <div style={{ font: "400 12.5px/1.5 var(--f-ui)", color: "#888e95" }}>
            Every purchase runs through a single-use card capped at the exact amount — your real card is
            never exposed to a merchant.
          </div>
        </div>
      </div>

      {/* theme / jewel accent */}
      <Eyebrow style={{ margin: "34px 0 14px" }}>Theme · brand accent</Eyebrow>
      <div style={{ padding: 22, borderRadius: 18, background: "var(--bg-card)", border: "1px solid rgba(220,226,230,.09)" }}>
        <div style={{ font: "400 12.5px/1.5 var(--f-ui)", color: "#888e95", marginBottom: 16 }}>
          One themeable jewel accent colors every surface — including email. Your choice is remembered.
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {JEWEL_PRESETS.map((p) => {
            const on = jewel.toLowerCase() === p.hex.toLowerCase();
            return (
              <button
                key={p.hex}
                onClick={() => setJewel(p.hex)}
                title={p.name}
                aria-label={p.name}
                aria-pressed={on}
                className="focusring"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: p.hex,
                  cursor: "pointer",
                  border: on ? "2px solid #f3f5f3" : "2px solid transparent",
                  boxShadow: on ? "0 0 0 2px rgba(243,245,243,.18)" : "none",
                  padding: 0,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
