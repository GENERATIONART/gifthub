import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { approveLogistics, approveAssure } from "../../data/app";

export function Approve() {
  const navigate = useNavigate();
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (!approved) return;
    const t = setTimeout(() => navigate("/app/tracking"), 950);
    return () => clearTimeout(t);
  }, [approved, navigate]);

  return (
    <div className="screen">
      <div className="eyebrow-accent">Ready to send · Sarah</div>
      <h1 className="hero" style={{ margin: "13px 0 8px" }}>
        Approve once. I'll <i>handle</i> the rest.
      </h1>
      <p className="lede" style={{ margin: "0 0 30px", maxWidth: "54ch" }}>
        You're committing to this one purchase — nothing more. I'll buy it, pair the card, and have it
        at her door before the 14th.
      </p>

      <div className="split">
        {/* commitment */}
        <div style={{ borderRadius: 20, overflow: "hidden", background: "var(--bg-card)", border: "var(--line)" }}>
          <CommitRow well="STONEWARE PLANTER" title="Hand-thrown planter set" sub="Clay & Kiln Studio · ships from Portland" price="$68" />
          <CommitRow well="DOG CARD" title="Dog-themed card" sub="Signed from you, Jake & Biscuit 🐾" price="$6" border />
          <div style={{ display: "flex", gap: 10, padding: "16px 18px", borderTop: "var(--line-subtle)", background: "rgba(220,226,230,.03)", flexWrap: "wrap" }}>
            {approveLogistics.map((l) => (
              <div key={l.label} style={{ flex: 1, minWidth: 90 }}>
                <div style={{ font: "500 9px/1 var(--f-ui)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--t-faint)" }}>
                  {l.label}
                </div>
                <div style={{ font: "500 13px/1.2 var(--f-ui)", color: "var(--t-body)", marginTop: 6 }}>{l.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* card + approve */}
        <div>
          <div
            style={{
              borderRadius: 18,
              padding: "18px 19px",
              background: "linear-gradient(135deg,#20242c,#15171c)",
              border: "var(--line)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
              <span style={{ font: "600 10px/1 var(--f-ui)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--g)" }}>
                Single-use card
              </span>
              <span style={{ font: "500 11px/1 var(--f-ui)", color: "#888e95" }}>Fondly Pay</span>
            </div>
            <div style={{ font: "400 16px/1 var(--f-display)", letterSpacing: ".14em", color: "var(--t-body)" }}>
              •••• •••• •••• 4014
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 16 }}>
              <div>
                <div style={{ font: "500 8.5px/1 var(--f-ui)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--t-faint)" }}>
                  Hard cap
                </div>
                <div style={{ font: "400 18px/1 var(--f-display)", color: "var(--t-primary)", marginTop: 6 }}>$74.00</div>
              </div>
              <span style={{ font: "400 11px/1.4 var(--f-ui)", color: "#888e95", textAlign: "right", maxWidth: "18ch" }}>
                Can't be charged a cent over. Locks after this order.
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {approveAssure.map((a) => (
              <div key={a.label} style={{ flex: 1, padding: "13px 8px", borderRadius: 13, background: "var(--bg-card)", border: "var(--line-subtle)", textAlign: "center" }}>
                <div style={{ fontSize: 15, color: "var(--g)", marginBottom: 7 }}>{a.icon}</div>
                <div style={{ font: "500 10.5px/1.3 var(--f-ui)", color: "var(--t-secondary)" }}>{a.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => !approved && setApproved(true)}
            className="focusring"
            style={{
              marginTop: 14,
              width: "100%",
              cursor: approved ? "default" : "pointer",
              borderRadius: 999,
              padding: 16,
              textAlign: "center",
              border: "none",
              font: "600 15px/1 var(--f-ui)",
              transition: "all .25s",
              background: approved ? "rgba(110,174,142,.16)" : "var(--g)",
              color: approved ? "#7fc3a0" : "#15171c",
            }}
          >
            {approved ? "✓ Approved — I'm on it" : "Approve $74 · send to Sarah"}
          </button>
          <div style={{ textAlign: "center", font: "400 11.5px/1 var(--f-ui)", color: "var(--t-faintest)", marginTop: 12 }}>
            {approved ? "Ordered · taking you to tracking…" : "You approve the commitment — not the busywork"}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommitRow({ well, title, sub, price, border = false }: { well: string; title: string; sub: string; price: string; border?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 15, padding: 18, ...(border ? { borderTop: "var(--line-subtle)" } : {}) }}>
      <div
        style={{
          width: 58,
          height: 58,
          flex: "none",
          borderRadius: 12,
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
        {well}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: "500 15px/1.15 var(--f-ui)", color: "var(--t-primary)" }}>{title}</div>
        <div style={{ font: "400 11.5px/1.3 var(--f-ui)", color: "#888e95", marginTop: 3 }}>{sub}</div>
      </div>
      <span style={{ font: "400 16px/1 var(--f-display)", color: "var(--t-primary)", flex: "none" }}>{price}</span>
    </div>
  );
}
