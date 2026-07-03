import { useLocation, useNavigate } from "react-router-dom";
import { Eyebrow } from "../../components/ui";
import { trackConcierge } from "../../data/app";
import type { ProjectDetail } from "../../lib/api";

interface TrackingState {
  project?: ProjectDetail;
  personId?: string;
  personName?: string;
}

export function Tracking() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as TrackingState | null) ?? {};
  const { project, personId, personName } = state;

  if (!project) {
    return (
      <div className="screen">
        <div className="eyebrow-accent">Tracking</div>
        <h1 className="hero" style={{ margin: "13px 0 8px" }}>
          Nothing in <i>transit</i> right now.
        </h1>
        <p className="lede" style={{ margin: "0 0 24px", maxWidth: "58ch" }}>
          Once you approve a gift, I'll track it here from order to doorstep.
        </p>
        <button
          onClick={() => navigate("/app")}
          className="focusring"
          style={{ padding: "11px 18px", borderRadius: 11, border: "1px solid rgba(220,226,230,.18)", background: "transparent", color: "var(--t-body)", font: "500 13px/1 var(--f-ui)", cursor: "pointer" }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const steps = project.track;
  const gift = project.gift;
  const giftLabel = gift ? gift.name : "";
  const giftDetail = `For ${project.person.name ?? personName ?? ""}`;
  const giftPrice = gift?.price ?? "";
  const giftWell = gift?.img ?? "";

  return (
    <div className="screen">
      <div className="eyebrow-accent">On track</div>
      <h1 className="hero" style={{ margin: "13px 0 8px" }}>
        It's handled. Arriving <i>soon</i>.
      </h1>
      <p className="lede" style={{ margin: "0 0 32px", maxWidth: "58ch" }}>
        Nothing for you to do. I'm watching the shipment — if it slips, I'll reroute or replace it
        before the occasion, and tell you only if I need a decision.
      </p>

      <div className="split-even">
        {/* timeline */}
        <div style={{ padding: "22px 22px 8px", borderRadius: 20, background: "var(--bg-card)", border: "var(--line)" }}>
          {steps.map((s, i) => {
            const done = s.st === "done";
            const act = s.st === "active";
            const last = i === steps.length - 1;
            return (
              <div key={i} style={{ display: "flex", gap: 15 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      font: "700 11px/1 var(--f-ui)",
                      flex: "none",
                      ...(done
                        ? { background: "var(--g)", color: "#15171c" }
                        : act
                          ? { background: "transparent", border: "2px solid var(--g)", color: "var(--g)", boxShadow: "0 0 0 4px rgba(201,168,106,.14)" }
                          : { background: "transparent", border: "1.5px solid #3a3f47" }),
                    }}
                  >
                    {done ? "✓" : ""}
                  </span>
                  {!last && <span style={{ width: 2, flex: 1, minHeight: 22, background: done ? "var(--g)" : "#2a2f37", margin: "3px 0" }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0, paddingBottom: 20 }}>
                  <div style={{ font: "500 14px/1.15 var(--f-ui)", color: s.st === "future" ? "#888e95" : "var(--t-primary)" }}>{s.title}</div>
                  <div style={{ font: "400 12px/1.4 var(--f-ui)", color: "#888e95", marginTop: 4 }}>{s.detail}</div>
                </div>
                <span style={{ font: "400 11px/1 var(--f-ui)", color: "var(--t-faintest)", flex: "none", paddingTop: 2 }}>{s.when}</span>
              </div>
            );
          })}
        </div>

        {/* package + concierge */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 15, padding: "16px 17px", borderRadius: 16, background: "var(--bg-card)", border: "var(--line-subtle)" }}>
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
              {giftWell}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: "500 14px/1.15 var(--f-ui)", color: "var(--t-primary)" }}>{giftLabel}</div>
              <div style={{ font: "400 11.5px/1.3 var(--f-ui)", color: "#888e95", marginTop: 3 }}>{giftDetail}</div>
            </div>
            <span style={{ font: "500 12px/1 var(--f-display)", color: "var(--g)" }}>{giftPrice}</span>
          </div>

          <Eyebrow style={{ margin: "24px 0 12px" }}>If anything's off</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {trackConcierge.map((c, i) => (
              <div
                key={i}
                className="focusring"
                role="button"
                tabIndex={0}
                style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 15px", background: "var(--bg-card)", border: "var(--line-subtle)", borderRadius: 14, cursor: "pointer" }}
              >
                <span style={{ fontSize: 16, color: "var(--g)", flex: "none", width: 20, textAlign: "center" }}>{c.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "500 13.5px/1.15 var(--f-ui)", color: "var(--t-body)" }}>{c.title}</div>
                  <div style={{ font: "400 11.5px/1.3 var(--f-ui)", color: "#888e95", marginTop: 2 }}>{c.sub}</div>
                </div>
                <span style={{ fontSize: 16, color: "var(--t-dim)" }}>›</span>
              </div>
            ))}
          </div>

          <div
            onClick={() =>
              navigate("/app/reaction", {
                state: { projectId: project?.id, personId: personId ?? project?.person.id, personName: project?.person.name ?? personName, gift },
              })
            }
            role="button"
            tabIndex={0}
            className="focusring"
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              gap: 13,
              padding: "15px 17px",
              borderRadius: 14,
              background: "rgba(201,168,106,.07)",
              border: "1px dashed rgba(201,168,106,.32)",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 16, color: "var(--g)", flex: "none", width: 20, textAlign: "center" }}>♥</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: "500 13.5px/1.15 var(--f-ui)", color: "var(--t-body)" }}>After it lands — tell me how it went</div>
              <div style={{ font: "400 11.5px/1.3 var(--f-ui)", color: "var(--t-muted)", marginTop: 2 }}>One tap teaches me more than a hundred picks</div>
            </div>
            <span style={{ fontSize: 16, color: "var(--g)" }}>›</span>
          </div>
        </div>
      </div>
    </div>
  );
}
