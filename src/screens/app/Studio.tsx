import { useNavigate } from "react-router-dom";
import { ImgWell } from "../../components/ui";
import { picks } from "../../data/app";

export function Studio() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 6, flexWrap: "wrap" }}>
        <div>
          <div className="eyebrow-accent">Sarah · her birthday · 12 days</div>
          <h1 className="hero" style={{ margin: "13px 0 0" }}>
            Ten gifts, <i>chosen</i> for her.
          </h1>
        </div>
        <button
          onClick={() => navigate("/app/refine")}
          className="focusring"
          style={{
            padding: "11px 18px",
            borderRadius: 11,
            border: "1px solid rgba(220,226,230,.18)",
            background: "transparent",
            color: "var(--t-body)",
            font: "500 13px/1 var(--f-ui)",
            cursor: "pointer",
          }}
        >
          Not quite it? Steer me →
        </button>
      </div>
      <p className="lede" style={{ margin: "14px 0 30px", maxWidth: "52ch" }}>
        I weighted toward things she can keep and touch — ceramics, her garden, and Biscuit. Each comes
        with why I picked it.
      </p>

      <div className="grid-3">
        {picks.map((g, i) => (
          <div
            key={g.id}
            data-pick
            className="pick-card focusring"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/app/approve")}
            style={{
              cursor: "pointer",
              overflow: "hidden",
              borderRadius: 18,
              background: "var(--bg-card)",
              border: `1px solid ${g.top ? "var(--g)" : "rgba(220,226,230,.1)"}`,
              boxShadow: g.top ? "0 0 0 1px rgba(201,168,106,.18)" : undefined,
              animation: "riseIn .5s cubic-bezier(.2,.7,.3,1) both",
              animationDelay: `${i * 70}ms`,
            }}
          >
            <ImgWell label={g.img} height={150} style={{ font: "500 7.5px/1.3 var(--f-mono)", letterSpacing: ".06em" }}>
              {g.top && (
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    font: "600 9px/1 var(--f-ui)",
                    letterSpacing: ".14em",
                    color: "#15171c",
                    background: "var(--g)",
                    padding: "6px 10px",
                    borderRadius: 999,
                  }}
                >
                  ◆ TOP PICK
                </span>
              )}
            </ImgWell>
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                <span style={{ font: "500 16px/1.15 var(--f-display)", color: "var(--t-primary)" }}>{g.name}</span>
                <span style={{ font: "500 13px/1 var(--f-display)", color: "#cfd3d7", flex: "none" }}>{g.price}</span>
              </div>
              <p style={{ margin: "8px 0 0", font: "400 12px/1.5 var(--f-ui)", color: "#888e95" }}>{g.why}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
