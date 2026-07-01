import { useNavigate } from "react-router-dom";
import { Avatar, Eyebrow } from "../../components/ui";
import { profile } from "../../data/app";

export function Profile() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      {/* identity */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30, flexWrap: "wrap" }}>
        <Avatar initial={profile.initial} bg="#2a2f37" fg="var(--g)" size={76} />
        <div style={{ flex: 1, minWidth: 180 }}>
          <h1 style={{ margin: 0, font: "400 36px/1 var(--f-display)", color: "var(--t-primary)" }}>{profile.name}</h1>
          <div style={{ font: "400 13.5px/1 var(--f-ui)", color: "#888e95", marginTop: 8 }}>{profile.relation}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <DateCard label="Birthday" value={profile.birthday} extra={`· ${profile.birthdayIn}`} />
          <DateCard label="Anniversary" value={profile.anniversary} />
        </div>
      </div>

      <div className="split">
        {/* what I know */}
        <div>
          <Eyebrow style={{ marginBottom: 8 }}>What I know about her</Eyebrow>
          <p style={{ margin: "0 0 18px", font: "400 13.5px/1.55 var(--f-ui)", color: "var(--t-muted)" }}>
            Built quietly from your chats, past gifts, and what you tell me — it's why the picks feel
            like her, not a catalogue.
          </p>
          <div style={{ font: "600 9.5px/1 var(--f-ui)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--g)", marginBottom: 11 }}>
            Loves
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            {profile.loves.map((x) => (
              <span key={x} style={{ font: "500 12.5px/1 var(--f-ui)", padding: "9px 14px", borderRadius: 999, background: "rgba(220,226,230,.08)", color: "var(--t-body)", border: "1px solid rgba(220,226,230,.16)" }}>
                {x}
              </span>
            ))}
          </div>
          <div style={{ font: "600 9.5px/1 var(--f-ui)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--t-muted)", marginBottom: 11 }}>
            Steer clear of
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {profile.avoid.map((x) => (
              <span key={x} style={{ font: "400 12.5px/1 var(--f-ui)", padding: "9px 14px", borderRadius: 999, color: "var(--t-faint)", border: "1px solid rgba(118,124,131,.3)", textDecoration: "line-through" }}>
                {x}
              </span>
            ))}
          </div>

          <Eyebrow style={{ margin: "28px 0 12px" }}>Her circle</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {profile.circle.map((c) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", background: "var(--bg-card)", border: "var(--line-subtle)", borderRadius: 14 }}>
                <Avatar initial={c.initial} bg={c.av[0]} fg={c.av[1]} size={34} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "500 13.5px/1.1 var(--f-ui)", color: "var(--t-body)" }}>{c.name}</div>
                  <div style={{ font: "400 11.5px/1.3 var(--f-ui)", color: "#888e95", marginTop: 3 }}>{c.note}</div>
                </div>
                <span style={{ font: "500 10px/1 var(--f-ui)", color: "var(--g)", flex: "none" }}>{c.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* gifts given */}
        <div>
          <Eyebrow style={{ marginBottom: 14 }}>
            Gifts you've given{" "}
            <span style={{ color: "var(--t-dim)", fontWeight: 400, letterSpacing: 0, textTransform: "none" }}>· so I never repeat</span>
          </Eyebrow>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {profile.history.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 15, padding: "14px 2px", borderBottom: "var(--line-subtle)" }}>
                <span style={{ font: "400 15px/1 var(--f-display)", color: "var(--g)", flex: "none", width: 40 }}>{h.year}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "500 13.5px/1.15 var(--f-ui)", color: "var(--t-body)" }}>{h.gift}</div>
                  <div style={{ font: "400 11.5px/1.3 var(--f-ui)", color: "#888e95", marginTop: 3 }}>{h.occasion}</div>
                </div>
                <span style={{ font: "400 12px/1 var(--f-display)", color: "#888e95", flex: "none" }}>{h.price}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "16px 17px", borderRadius: 14, border: "1px dashed rgba(220,226,230,.14)", display: "flex", gap: 11, alignItems: "flex-start" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--g)", flex: "none", marginTop: 6 }} />
            <span style={{ font: "500 13px/1.5 var(--f-display)", fontStyle: "italic", color: "var(--t-muted)" }}>{profile.insight}</span>
          </div>
          <button
            onClick={() => navigate("/app/studio")}
            className="focusring"
            style={{ marginTop: 16, width: "100%", padding: 14, borderRadius: 12, background: "var(--g)", color: "#15171c", border: "none", font: "600 13px/1 var(--f-ui)", cursor: "pointer" }}
          >
            See this year's picks for Sarah →
          </button>
        </div>
      </div>
    </div>
  );
}

function DateCard({ label, value, extra }: { label: string; value: string; extra?: string }) {
  return (
    <div style={{ padding: "14px 18px", borderRadius: 13, background: "var(--bg-card)", border: "var(--line)" }}>
      <div style={{ font: "500 9px/1 var(--f-ui)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--t-faint)" }}>{label}</div>
      <div style={{ font: "400 17px/1 var(--f-display)", color: "var(--t-primary)", marginTop: 8 }}>
        {value} {extra && <span style={{ font: "500 11px/1 var(--f-ui)", color: "var(--g)" }}>{extra}</span>}
      </div>
    </div>
  );
}
