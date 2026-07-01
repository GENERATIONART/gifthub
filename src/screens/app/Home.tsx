import { useNavigate } from "react-router-dom";
import { Avatar, Eyebrow, StatusPill } from "../../components/ui";
import { needsYou, inMotion, currentUser } from "../../data/app";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div className="eyebrow-accent">Tuesday, October 2</div>
      <h1 className="hero" style={{ margin: "14px 0 8px" }}>
        Good morning, {currentUser.first}.<br />
        Three moments, <i>handled</i> or nearly.
      </h1>
      <p className="lede" style={{ maxWidth: "54ch" }}>
        You have two decisions waiting. Everything else I'm already moving on — open the assistant to
        see what I'm doing right now.
      </p>

      <Eyebrow style={{ margin: "38px 0 16px" }}>Needs you today</Eyebrow>
      <div className="grid-2">
        {needsYou.map((m) => (
          <div
            key={m.who}
            className="focusring"
            role="button"
            tabIndex={0}
            onClick={() => m.to && navigate(m.to)}
            style={{
              borderRadius: 18,
              background: "var(--bg-card)",
              border: "1px solid var(--g)",
              boxShadow: "0 0 0 1px rgba(201,168,106,.18)",
              padding: 20,
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <Avatar initial={m.initial} bg={m.av[0]} fg={m.av[1]} size={42} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: "500 15px/1.1 var(--f-ui)", color: "var(--t-primary)" }}>{m.who}</div>
                <div style={{ font: "400 12px/1 var(--f-ui)", color: "#888e95", marginTop: 4 }}>
                  {m.occasion} · {m.when}
                </div>
              </div>
              <span
                style={{
                  font: "600 9px/1 var(--f-ui)",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  padding: "5px 9px",
                  borderRadius: 7,
                  background: "var(--g)",
                  color: "#15171c",
                }}
              >
                Decide
              </span>
            </div>
            <p style={{ margin: 0, font: "400 13.5px/1.5 var(--f-ui)", color: "var(--t-secondary)" }}>{m.line}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "36px 0 14px" }}>
        <Eyebrow>In motion · no action needed</Eyebrow>
        <span style={{ font: "400 12px/1 var(--f-ui)", color: "var(--t-faintest)" }} className="hide-sm">
          I'll surface these only if something changes
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {inMotion.map((m) => (
          <div
            key={m.who}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "15px 18px",
              background: "var(--bg-card)",
              border: "var(--line-faint)",
              borderRadius: 14,
            }}
          >
            <Avatar initial={m.initial} bg={m.av[0]} fg={m.av[1]} size={40} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: "500 14px/1.15 var(--f-ui)", color: "var(--t-body)" }}>
                {m.who} · {m.occasion}
              </div>
              <div style={{ font: "400 12.5px/1.3 var(--f-ui)", color: "#888e95", marginTop: 3 }}>{m.line}</div>
            </div>
            <StatusPill tone={m.tone}>{m.status}</StatusPill>
            <span
              style={{ font: "400 11.5px/1 var(--f-ui)", color: "var(--t-faintest)", width: 64, textAlign: "right", flex: "none" }}
            >
              {m.when}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
