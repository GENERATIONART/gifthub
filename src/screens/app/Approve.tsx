import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { approveLogistics, approveAssure } from "../../data/app";
import { api, type ProjectGift } from "../../lib/api";
import { isLive } from "../../lib/supabase";

interface ApproveState {
  personId?: string;
  occasionId?: string | null;
  personName?: string;
  gift?: ProjectGift;
}

export function Approve() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as ApproveState | null) ?? {};
  const { personId, occasionId, personName = "" } = state;
  const gift = state.gift;
  const live = isLive && personId && gift?.id;

  const [approved, setApproved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!approved || live) return;
    // Offline/seed mode: no real order to place, just carry the demo forward.
    const t = setTimeout(() => navigate("/app/tracking"), 950);
    return () => clearTimeout(t);
  }, [approved, live, navigate]);

  if (!gift) {
    return (
      <div className="screen">
        <div className="eyebrow-accent">Approve</div>
        <h1 className="hero" style={{ margin: "13px 0 8px" }}>
          No gift <i>selected</i> yet.
        </h1>
        <p className="lede" style={{ margin: "0 0 24px", maxWidth: "54ch" }}>
          Pick something in Studio first, then come back here to approve it.
        </p>
        <button
          onClick={() => navigate("/app/studio")}
          className="focusring"
          style={{ padding: "11px 18px", borderRadius: 11, border: "1px solid rgba(220,226,230,.18)", background: "transparent", color: "var(--t-body)", font: "500 13px/1 var(--f-ui)", cursor: "pointer" }}
        >
          Go to Studio
        </button>
      </div>
    );
  }

  const handleApprove = () => {
    if (approved) return;
    setApproved(true);
    setError(null);
    if (!live) return;
    api
      .approveProject({ person_id: personId!, gift_id: gift.id, occasion_id: occasionId })
      .then((project) => {
        setTimeout(() => navigate("/app/tracking", { state: { project, personId, personName } }), 950);
      })
      .catch(() => {
        setApproved(false);
        setError("Couldn't place the order — try again.");
      });
  };

  return (
    <div className="screen">
      <div className="eyebrow-accent">{personName ? `Ready to send · ${personName}` : "Ready to send"}</div>
      <h1 className="hero" style={{ margin: "13px 0 8px" }}>
        Approve once. I'll <i>handle</i> the rest.
      </h1>
      <p className="lede" style={{ margin: "0 0 30px", maxWidth: "54ch" }}>
        You're committing to this one purchase — nothing more. I'll buy it, pair the card, and have it
        at their door in time.
      </p>

      <div className="split">
        {/* commitment */}
        <div style={{ borderRadius: 20, overflow: "hidden", background: "var(--bg-card)", border: "var(--line)" }}>
          <CommitRow well={gift.img ?? ""} title={gift.name} sub={gift.why ?? ""} price={gift.price} />
          <CommitRow well="CARD" title="Card" sub={`Signed from you, for ${personName}`} price="$6" border />
          <div style={{ display: "flex", gap: 10, padding: "16px 18px", borderTop: "var(--line-subtle)", background: "rgba(220,226,230,.03)", flexWrap: "wrap" }}>
            {approveLogistics.map((l) => (
              <div key={l.label} style={{ flex: 1, minWidth: 90 }}>
                <div style={{ font: "500 9px/1 var(--f-ui)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--t-faint)" }}>
                  {l.label}
                </div>
                <div style={{ font: "500 13px/1.2 var(--f-ui)", color: "var(--t-body)", marginTop: 6 }}>
                  {l.label === "Ship to" ? `${personName} · home` : l.value}
                </div>
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
                <div style={{ font: "400 18px/1 var(--f-display)", color: "var(--t-primary)", marginTop: 6 }}>{gift.price}</div>
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
            onClick={handleApprove}
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
            {approved ? "✓ Approved — I'm on it" : `Approve ${gift.price} · send to ${personName}`}
          </button>
          {error && (
            <div style={{ textAlign: "center", font: "400 12px/1 var(--f-ui)", color: "#d99a9a", marginTop: 10 }}>{error}</div>
          )}
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
