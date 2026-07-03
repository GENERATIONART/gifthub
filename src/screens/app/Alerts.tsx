import type { Alert } from "../../data/app";
import { api } from "../../lib/api";
import { useLive } from "../../lib/useLive";

export function Alerts() {
  const rows = useLive<Alert[]>(() => api.alerts(), []);
  return (
    <div className="screen">
      <div className="eyebrow-accent">When something's off</div>
      <h1 className="hero" style={{ margin: "14px 0 8px" }}>
        I hit a snag — and a <i>fix</i>.
      </h1>
      <p className="lede">
        I never leave you at a dead end. When something breaks, I've already worked out the way around
        it — you just pick.
      </p>

      {rows.length === 0 && (
        <p style={{ marginTop: 28, font: "400 13.5px/1.5 var(--f-ui)", color: "var(--t-faint)" }}>
          Nothing needs your attention right now — I'll show up here the moment something does.
        </p>
      )}

      <div className="grid-2" style={{ marginTop: 28, alignItems: "start" }}>
        {rows.map((a, i) => {
          const high = a.severity === "high";
          return (
            <div
              key={i}
              style={{
                padding: 18,
                borderRadius: 18,
                background: "var(--bg-card)",
                border: `1px solid ${high ? "rgba(201,138,138,.3)" : "rgba(220,226,230,.1)"}`,
              }}
            >
              <div style={{ display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 13 }}>
                <span
                  style={{
                    width: 38,
                    height: 38,
                    flex: "none",
                    borderRadius: 11,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                    ...(high ? { background: "rgba(201,138,138,.16)", color: "#d99a9a" } : { background: "rgba(220,226,230,.07)", color: "var(--g)" }),
                  }}
                >
                  {a.icon}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <span
                      style={{
                        font: "600 8.5px/1 var(--f-ui)",
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        padding: "4px 8px",
                        borderRadius: 6,
                        ...(high ? { background: "rgba(201,138,138,.16)", color: "#d99a9a" } : { background: "rgba(220,226,230,.08)", color: "var(--t-secondary)" }),
                      }}
                    >
                      {a.tag}
                    </span>
                    <span style={{ font: "400 11px/1 var(--f-ui)", color: "var(--t-faintest)" }}>{a.who}</span>
                  </div>
                  <div style={{ font: "500 15.5px/1.25 var(--f-ui)", color: "var(--t-primary)" }}>{a.title}</div>
                </div>
              </div>
              <p style={{ margin: "0 0 14px", font: "400 13px/1.55 var(--f-ui)", color: "var(--t-muted)" }}>{a.body}</p>

              {/* the required gold "fix" strip with the f mark */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: "rgba(201,168,106,.08)",
                  border: "1px solid rgba(201,168,106,.22)",
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    flex: "none",
                    borderRadius: "50%",
                    border: "1px solid var(--g)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--g)",
                    font: "400 12px/1 var(--f-display)",
                  }}
                >
                  f
                </span>
                <span style={{ font: "500 12.5px/1.45 var(--f-ui)", color: "var(--t-body)" }}>{a.fix}</span>
              </div>

              <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                {a.actions.map((b) => (
                  <button
                    key={b.label}
                    className="focusring"
                    style={{
                      cursor: "pointer",
                      font: "600 12px/1 var(--f-ui)",
                      padding: "11px 15px",
                      borderRadius: 10,
                      border: b.primary ? "none" : "1px solid rgba(220,226,230,.18)",
                      background: b.primary ? "var(--g)" : "transparent",
                      color: b.primary ? "#15171c" : "#cfd3d7",
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
