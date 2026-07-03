import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImgWell } from "../../components/ui";
import { refineDials, type Axes } from "../../data/app";
import { api, type ScoredGift } from "../../lib/api";
import { isLive } from "../../lib/supabase";

export function Refine() {
  const navigate = useNavigate();
  const [dials, setDials] = useState<Axes>({ feel: 1, spend: 1, form: 0, risk: 0 });
  const [personId, setPersonId] = useState<string | null>(null);
  const [results, setResults] = useState<ScoredGift[]>([]);
  const [loading, setLoading] = useState(false);

  const setAxis = (axis: keyof Axes, value: number) => setDials((d) => ({ ...d, [axis]: value }));

  useEffect(() => {
    if (!isLive) return;
    api.listPeople().then((p) => setPersonId(p[0]?.id ?? null)).catch(() => setPersonId(null));
  }, []);

  useEffect(() => {
    if (!isLive || !personId) return;
    let cancelled = false;
    setLoading(true);
    api
      .refine(personId, dials)
      .then((r) => !cancelled && setResults(r))
      .catch(() => !cancelled && setResults([]))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [personId, dials]);

  const top = results[0];
  const rest = results.slice(1, 5);

  const active = refineDials.filter((def) => dials[def.axis] !== 0).map((def) => def.names[dials[def.axis] + 1].toLowerCase());
  const userSaid = active.length ? "Make it more " + active.slice(0, 2).join(" and ") : "Show me other directions";
  const aiReply = top
    ? `Done — I re-ranked around that. ${top.name} rose to the top because it's ${(top.match ?? "").replace(" · ", " and ")}.`
    : "";

  return (
    <div className="screen">
      <h1 className="hero" style={{ margin: "0 0 6px" }}>
        Not quite it? <i>Steer</i> me.
      </h1>
      <p className="lede" style={{ margin: "0 0 22px" }}>
        Nudge a dial and I re-curate instantly — you're directing me, not scrolling a store.
      </p>

      {/* dials */}
      <div className="grid-4" style={{ marginBottom: 26 }}>
        {refineDials.map((def) => (
          <div key={def.axis}>
            <div
              style={{
                font: "600 9.5px/1 var(--f-ui)",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "var(--t-faint)",
                marginBottom: 10,
              }}
            >
              {def.title}
            </div>
            <div
              style={{
                display: "flex",
                gap: 3,
                padding: 3,
                borderRadius: 12,
                background: "var(--bg-screen)",
                border: "var(--line-subtle)",
              }}
            >
              {def.names.map((label, i) => {
                const val = i - 1;
                const on = dials[def.axis] === val;
                return (
                  <button
                    key={label}
                    onClick={() => setAxis(def.axis, val)}
                    className="focusring"
                    style={{
                      flex: 1,
                      textAlign: "center",
                      cursor: "pointer",
                      padding: "9px 4px",
                      borderRadius: 9,
                      border: "none",
                      font: `${on ? 600 : 500} 11.5px/1 var(--f-ui)`,
                      whiteSpace: "nowrap",
                      transition: "all .18s",
                      background: on ? "var(--g)" : "transparent",
                      color: on ? "#15171c" : "var(--t-muted)",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* results */}
      {!top ? (
        <p style={{ marginTop: 20, font: "400 13.5px/1.5 var(--f-ui)", color: "var(--t-faint)" }}>
          {loading ? "Re-ranking…" : "No gifts to show yet — add a recipient with a few loves to get picks here."}
        </p>
      ) : (
      <div className="split-even">
        {/* top pick */}
        <div
          key={top.name}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            background: "var(--bg-card)",
            border: "1px solid var(--g)",
            boxShadow: "0 0 0 1px rgba(201,168,106,.18)",
            animation: "fadeUp .4s ease both",
          }}
        >
          <ImgWell label={top.img} height={170}>
            <span
              style={{
                position: "absolute",
                top: 13,
                left: 13,
                font: "600 9.5px/1 var(--f-ui)",
                letterSpacing: ".14em",
                color: "#15171c",
                background: "var(--g)",
                padding: "6px 11px",
                borderRadius: 999,
              }}
            >
              ◆ BEST FIT NOW
            </span>
            <span
              style={{
                position: "absolute",
                top: 13,
                right: 13,
                font: "500 13px/1 var(--f-display)",
                color: "var(--t-primary)",
                background: "rgba(21,23,28,.72)",
                padding: "6px 11px",
                borderRadius: 999,
              }}
            >
              {top.price}
            </span>
          </ImgWell>
          <div style={{ padding: 18 }}>
            <div style={{ font: "500 19px/1.15 var(--f-display)", color: "var(--t-primary)", marginBottom: 9 }}>{top.name}</div>
            <p style={{ margin: "0 0 14px", font: "400 13px/1.55 var(--f-ui)", color: "var(--t-muted)" }}>{top.why}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <span style={{ font: "500 10.5px/1.3 var(--f-ui)", color: "var(--t-faint)" }}>Matches · {top.match}</span>
              <button
                onClick={() => navigate("/app/approve")}
                className="focusring"
                style={{
                  font: "600 12px/1 var(--f-ui)",
                  color: "#15171c",
                  background: "var(--g)",
                  padding: "10px 17px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Choose this
              </button>
            </div>
          </div>
        </div>

        {/* conversation + rest */}
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span
              style={{
                maxWidth: "80%",
                font: "500 12.5px/1.4 var(--f-ui)",
                color: "#15171c",
                background: "var(--g)",
                padding: "10px 14px",
                borderRadius: "16px 16px 4px 16px",
              }}
            >
              {userSaid}
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
            <span
              style={{
                width: 24,
                height: 24,
                flex: "none",
                borderRadius: "50%",
                border: "1px solid var(--g)",
                color: "var(--g)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                font: "400 12px/1 var(--f-display)",
              }}
            >
              f
            </span>
            <span style={{ font: "400 13px/1.5 var(--f-ui)", color: "#cfd3d7", paddingTop: 2 }}>{aiReply}</span>
          </div>
          {rest.map((g, i) => (
            <div
              key={g.name}
              style={{
                display: "flex",
                background: "var(--bg-card)",
                border: "var(--line)",
                borderRadius: 14,
                overflow: "hidden",
                animation: "fadeUp .4s ease both",
                animationDelay: `${i * 40}ms`,
              }}
            >
              <div
                style={{
                  width: 78,
                  flex: "none",
                  background: "var(--bg-card-alt)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "500 6px/1.25 var(--f-mono)",
                  color: "var(--t-faint)",
                  textAlign: "center",
                  padding: 5,
                }}
              >
                {g.img}
              </div>
              <div style={{ flex: 1, minWidth: 0, padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ font: "500 14px/1.1 var(--f-display)", color: "var(--t-primary)" }}>{g.name}</span>
                  <span style={{ font: "500 12px/1 var(--f-display)", color: "#cfd3d7", flex: "none" }}>{g.price}</span>
                </div>
                <p style={{ margin: "5px 0 0", font: "400 11px/1.4 var(--f-ui)", color: "#888e95" }}>{g.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}
