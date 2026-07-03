import { useNavigate } from "react-router-dom";
import { Avatar, Eyebrow, StatusPill } from "../../components/ui";
import { currentUser as seedCurrentUser } from "../../data/app";
import { api, type CurrentUser, type HomeData } from "../../lib/api";
import { useLive } from "../../lib/useLive";

const DEFAULT_AV: [string, string] = ["#2a2f37", "var(--g)"];
const TODAY = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

export function Home() {
  const navigate = useNavigate();
  const { needs_you, in_motion } = useLive<HomeData>(
    () => api.home(),
    { needs_you: [], in_motion: [] },
  );
  const currentUser = useLive<CurrentUser>(() => api.me(), {
    id: "", name: seedCurrentUser.name, first_name: seedCurrentUser.first,
    initials: seedCurrentUser.initials, plan: seedCurrentUser.plan, jewel: "",
  });
  const first = currentUser.first_name || currentUser.name.split(" ")[0];

  return (
    <div className="screen">
      <div className="eyebrow-accent">{TODAY}</div>
      <h1 className="hero" style={{ margin: "14px 0 8px" }}>
        Good morning, {first}.
      </h1>
      <p className="lede" style={{ maxWidth: "54ch" }}>
        {needs_you.length > 0
          ? `You have ${needs_you.length} decision${needs_you.length === 1 ? "" : "s"} waiting. Everything else I'm already moving on — open the assistant to see what I'm doing right now.`
          : "Nothing needs a decision right now — open the assistant if you'd like me to start something."}
      </p>

      {needs_you.length > 0 && (
        <>
      <Eyebrow style={{ margin: "38px 0 16px" }}>Needs you today</Eyebrow>
      <div className="grid-2">
        {needs_you.map((m) => (
          <div
            key={m.who}
            className="focusring"
            role="button"
            tabIndex={0}
            onClick={() =>
              m.to &&
              navigate(m.to, m.person_id ? { state: { personId: m.person_id, occasionId: m.occasion_id } } : undefined)
            }
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
              <Avatar initial={m.initial} bg={(m.av ?? DEFAULT_AV)[0]} fg={(m.av ?? DEFAULT_AV)[1]} size={42} />
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
        </>
      )}

      {in_motion.length > 0 && (
        <>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "36px 0 14px" }}>
        <Eyebrow>In motion · no action needed</Eyebrow>
        <span style={{ font: "400 12px/1 var(--f-ui)", color: "var(--t-faintest)" }} className="hide-sm">
          I'll surface these only if something changes
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {in_motion.map((m) => (
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
            <Avatar initial={m.initial} bg={(m.av ?? DEFAULT_AV)[0]} fg={(m.av ?? DEFAULT_AV)[1]} size={40} />
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
        </>
      )}

      {needs_you.length === 0 && in_motion.length === 0 && (
        <p style={{ marginTop: 30, font: "400 13.5px/1.5 var(--f-ui)", color: "var(--t-faint)" }}>
          Nothing in motion yet — add someone and an occasion to get started.
        </p>
      )}
    </div>
  );
}
