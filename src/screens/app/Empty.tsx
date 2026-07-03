import { useNavigate } from "react-router-dom";
import { currentUser as seedCurrentUser, setupSteps } from "../../data/app";
import { api, type CurrentUser } from "../../lib/api";
import { useLive } from "../../lib/useLive";

export function Empty() {
  const navigate = useNavigate();
  const currentUser = useLive<CurrentUser>(() => api.me(), {
    id: "", name: seedCurrentUser.name, first_name: seedCurrentUser.first,
    initials: seedCurrentUser.initials, plan: seedCurrentUser.plan, jewel: "",
  });
  const first = currentUser.first_name || currentUser.name.split(" ")[0];

  return (
    <div className="screen screen-mid" style={{ paddingTop: 64, animation: "fadeUp .5s ease both" }}>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "1px solid var(--g)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--g)",
          font: "400 26px/1 var(--f-display)",
          marginBottom: 26,
        }}
      >
        f
      </div>
      <h1 className="hero hero-lg" style={{ margin: "0 0 12px" }}>
        Let's begin, {first}.<br />
        Who do you <i>gift</i> most?
      </h1>
      <p style={{ margin: "0 0 36px", font: "400 16px/1.6 var(--f-ui)", color: "var(--t-muted)", maxWidth: "52ch" }}>
        Add one person and a date, and I'll start learning them in the background — their taste, their
        people, what you've given before. The more I know, the less you'll ever have to think about it.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {setupSteps.map((s) => (
          <div
            key={s.num}
            onClick={() => navigate(s.to)}
            role="button"
            tabIndex={0}
            className="focusring"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "18px 20px",
              borderRadius: 16,
              background: "var(--bg-card)",
              border: "1px solid rgba(220,226,230,.09)",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: 30,
                height: 30,
                flex: "none",
                borderRadius: "50%",
                border: "1px solid var(--g)",
                color: "var(--g)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                font: "500 13px/1 var(--f-ui)",
              }}
            >
              {s.num}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: "500 15px/1.2 var(--f-ui)", color: "var(--t-primary)" }}>{s.title}</div>
              <div style={{ font: "400 12.5px/1.4 var(--f-ui)", color: "#888e95", marginTop: 4 }}>{s.sub}</div>
            </div>
            <span style={{ fontSize: 17, color: "var(--g)", flex: "none" }}>{s.cta}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/app")}
        className="focusring"
        style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 26px", borderRadius: 12, background: "var(--g)", color: "#15171c", border: "none", font: "600 14px/1 var(--f-ui)", cursor: "pointer" }}
      >
        Add your first person <span style={{ fontSize: 15 }}>→</span>
      </button>
    </div>
  );
}
