import { Eyebrow } from "../../components/ui";
import { notifGroups } from "../../data/app";

export function Notifications() {
  let idx = 0;
  return (
    <div className="screen screen-mid">
      <div className="eyebrow-accent">From your concierge</div>
      <h1 className="hero" style={{ margin: "14px 0 8px" }}>
        I noticed a few <i>things</i>.
      </h1>
      <p className="lede" style={{ maxWidth: "54ch" }}>
        Small observations and the odd decision. I only interrupt when it's worth it — everything else
        I just handle.
      </p>

      {notifGroups.map((grp) => (
        <div key={grp.label} style={{ marginTop: 26 }}>
          <Eyebrow style={{ marginBottom: 14 }}>{grp.label}</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {grp.items.map((n, i) => {
              const decide = n.tone === "decide";
              const delay = idx++ * 80;
              return (
                <div
                  key={i}
                  style={{
                    padding: "18px 20px",
                    borderRadius: 18,
                    background: "var(--bg-card)",
                    border: `1px solid ${decide ? "var(--g)" : "rgba(220,226,230,.09)"}`,
                    boxShadow: decide ? "0 0 0 1px rgba(201,168,106,.16)" : undefined,
                    animation: "riseIn .5s cubic-bezier(.2,.7,.3,1) both",
                    animationDelay: `${delay}ms`,
                  }}
                >
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span
                      style={{
                        width: 38,
                        height: 38,
                        flex: "none",
                        borderRadius: 11,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        ...(decide ? { background: "var(--g)", color: "#15171c" } : { background: "rgba(220,226,230,.07)", color: "var(--g)" }),
                      }}
                    >
                      {n.icon}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ font: "500 15px/1.2 var(--f-ui)", color: "var(--t-primary)" }}>{n.title}</span>
                        <span style={{ font: "400 11.5px/1 var(--f-ui)", color: "var(--t-faintest)" }}>{n.who}</span>
                      </div>
                      <p style={{ margin: "0 0 14px", font: "400 13.5px/1.55 var(--f-ui)", color: "var(--t-muted)" }}>{n.body}</p>
                      <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                        {n.actions.map((label, ai) => {
                          const primary = ai === 0 && decide;
                          return (
                            <button
                              key={label}
                              className="focusring"
                              style={{
                                cursor: "pointer",
                                font: "600 12px/1 var(--f-ui)",
                                padding: "10px 16px",
                                borderRadius: 10,
                                border: primary ? "none" : "1px solid rgba(220,226,230,.16)",
                                background: primary ? "var(--g)" : "transparent",
                                color: primary ? "#15171c" : "#cfd3d7",
                              }}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
