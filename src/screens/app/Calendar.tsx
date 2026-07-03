import type { CalMonth } from "../../data/app";
import { api } from "../../lib/api";
import { useLive } from "../../lib/useLive";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const emptyYear = (): CalMonth[] => {
  const nowIdx = new Date().getMonth();
  return MONTH_NAMES.map((m, i) => ({ m, occ: [], now: i === nowIdx }));
};

export function Calendar() {
  const months = useLive(() => api.calendar(), emptyYear());
  return (
    <div className="screen">
      <div className="eyebrow-accent">2026 · at a glance</div>
      <h1 className="hero" style={{ margin: "14px 0 8px" }}>
        Every moment that <i>matters</i>, mapped.
      </h1>
      <p className="lede">
        Every birthday and anniversary you've told me about. I watch all of them quietly — you only ever
        see the two or three that need you soon.
      </p>

      <div className="grid-4" style={{ marginTop: 30 }}>
        {months.map((mo, mi) => (
          <div
            key={mo.m}
            style={{
              borderRadius: 16,
              padding: "16px 16px 14px",
              animation: "riseIn .5s cubic-bezier(.2,.7,.3,1) both",
              animationDelay: `${mi * 35}ms`,
              background: mo.now ? "rgba(201,168,106,.06)" : "var(--bg-card)",
              border: `1px solid ${mo.now ? "var(--g)" : "rgba(220,226,230,.08)"}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ font: "400 18px/1 var(--f-display)", color: mo.occ.length ? "var(--t-primary)" : "var(--t-faint)" }}>
                {mo.m}
              </span>
              {mo.now && (
                <span
                  style={{
                    font: "600 8.5px/1 var(--f-ui)",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "#15171c",
                    background: "var(--g)",
                    padding: "4px 7px",
                    borderRadius: 6,
                  }}
                >
                  Now
                </span>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 38 }}>
              {mo.occ.map((o, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span
                    style={{
                      font: "500 10px/1 var(--f-ui)",
                      width: 22,
                      textAlign: "center",
                      padding: "5px 0",
                      borderRadius: 6,
                      flex: "none",
                      background: o.tone === "gold" ? "var(--g)" : "rgba(220,226,230,.1)",
                      color: o.tone === "gold" ? "#15171c" : "var(--t-secondary)",
                    }}
                  >
                    {o.d}
                  </span>
                  <span
                    style={{
                      font: "500 12px/1.2 var(--f-ui)",
                      color: "var(--t-secondary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {o.who}
                  </span>
                </div>
              ))}
              {mo.occ.length === 0 && <span style={{ font: "400 13px/1 var(--f-ui)", color: "#454b52" }}>—</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
