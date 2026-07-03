import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Eyebrow } from "../../components/ui";
import { api, type CircleSuggestion, type PersonDetail } from "../../lib/api";
import { useLive } from "../../lib/useLive";
import { isLive } from "../../lib/supabase";
import { EditPersonModal } from "../../components/EditPersonModal";

const DEFAULT_AV: [string, string] = ["#2a2f37", "var(--g)"];

interface Profile {
  name: string;
  initial: string;
  relation: string;
  birthday: string;
  birthdayIn: string;
  anniversary: string;
  loves: string[];
  avoid: string[];
  circle: { name: string; initial: string; note: string; tag: string; av: [string, string] }[];
  history: { year: string; gift: string; occasion: string; price: string }[];
  insight: string;
}

const EMPTY_PROFILE: Profile = {
  name: "", initial: "", relation: "", birthday: "—", birthdayIn: "", anniversary: "—",
  loves: [], avoid: [], circle: [], history: [], insight: "",
};

function fmtDate(iso?: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function relDays(iso?: string | null): string {
  if (!iso) return "";
  const now = new Date();
  const next = new Date(iso);
  next.setFullYear(now.getFullYear());
  if (next < now) next.setFullYear(now.getFullYear() + 1);
  return `${Math.ceil((next.getTime() - now.getTime()) / 86_400_000)}d`;
}

/** Map the API's PersonDetail onto the rich profile shape the screen renders. */
function toProfile(d: PersonDetail): Profile {
  return {
    name: d.name,
    initial: d.initial ?? d.name[0],
    relation: d.relation ?? "",
    birthday: fmtDate(d.birthday),
    birthdayIn: relDays(d.birthday),
    anniversary: fmtDate(d.anniversary),
    loves: d.loves,
    avoid: d.avoid,
    circle: d.circle.map((c) => ({
      name: c.name,
      initial: c.initial ?? c.name[0],
      note: c.note ?? "",
      tag: c.tag ?? "",
      av: c.av ?? DEFAULT_AV,
    })),
    history: d.history.map((h) => ({
      year: h.year ?? "",
      gift: h.gift,
      occasion: h.occasion ?? "",
      price: h.price ?? "",
    })),
    insight: d.insight ?? d.taste_summary ?? "",
  };
}

export function Profile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [circleVersion, setCircleVersion] = useState(0);
  const p = useLive<Profile>(
    () => (id ? api.getPerson(id).then(toProfile) : Promise.resolve(EMPTY_PROFILE)),
    EMPTY_PROFILE,
    [id, circleVersion],
  );

  // Named-entity suggestions from her loves/avoid text ("her dog Molly") — an
  // approval queue, never auto-added.
  const [suggestions, setSuggestions] = useState<CircleSuggestion[]>([]);
  const [addingName, setAddingName] = useState<string | null>(null);
  useEffect(() => {
    setSuggestions([]);
    if (!isLive || !id) return;
    let cancelled = false;
    api
      .suggestCircle(id)
      .then((s) => !cancelled && setSuggestions(s))
      .catch(() => !cancelled && setSuggestions([]));
    return () => {
      cancelled = true;
    };
  }, [id, circleVersion]);

  const approveSuggestion = (s: CircleSuggestion) => {
    if (!id || addingName) return;
    setAddingName(s.name);
    api
      .addCircleMember(id, s)
      .then(() => {
        setSuggestions((cur) => cur.filter((x) => x.name !== s.name));
        setCircleVersion((v) => v + 1);
      })
      .catch(() => {})
      .finally(() => setAddingName(null));
  };

  const dismissSuggestion = (s: CircleSuggestion) => {
    setSuggestions((cur) => cur.filter((x) => x.name !== s.name));
  };

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<PersonDetail | null>(null);
  const openEdit = () => {
    if (!id) return;
    api.getPerson(id).then((d) => {
      setEditData(d);
      setEditOpen(true);
    });
  };

  return (
    <div className="screen">
      {/* identity */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30, flexWrap: "wrap" }}>
        <Avatar initial={p.initial} bg="#2a2f37" fg="var(--g)" size={76} />
        <div style={{ flex: 1, minWidth: 180 }}>
          <h1 style={{ margin: 0, font: "400 36px/1 var(--f-display)", color: "var(--t-primary)" }}>{p.name}</h1>
          <div style={{ font: "400 13.5px/1 var(--f-ui)", color: "#888e95", marginTop: 8 }}>{p.relation}</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <DateCard label="Birthday" value={p.birthday} extra={`· ${p.birthdayIn}`} />
          <DateCard label="Anniversary" value={p.anniversary} />
          {isLive && id && (
            <button
              onClick={openEdit}
              className="focusring"
              style={{
                padding: "10px 16px",
                borderRadius: 11,
                border: "1px solid rgba(220,226,230,.16)",
                background: "transparent",
                color: "var(--t-body)",
                font: "500 12.5px/1 var(--f-ui)",
                cursor: "pointer",
                flex: "none",
                alignSelf: "stretch",
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {editOpen && editData && (
        <EditPersonModal
          person={editData}
          onClose={() => setEditOpen(false)}
          onSaved={() => {
            setEditOpen(false);
            setCircleVersion((v) => v + 1);
          }}
        />
      )}

      <div className="split">
        {/* what I know */}
        <div>
          <Eyebrow style={{ marginBottom: 8 }}>What I know about them</Eyebrow>
          <p style={{ margin: "0 0 18px", font: "400 13.5px/1.55 var(--f-ui)", color: "var(--t-muted)" }}>
            Built quietly from your chats, past gifts, and what you tell me — it's why the picks feel
            like them, not a catalogue.
          </p>
          <div style={{ font: "600 9.5px/1 var(--f-ui)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--g)", marginBottom: 11 }}>
            Loves
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            {p.loves.map((x) => (
              <span key={x} style={{ font: "500 12.5px/1 var(--f-ui)", padding: "9px 14px", borderRadius: 999, background: "rgba(220,226,230,.08)", color: "var(--t-body)", border: "1px solid rgba(220,226,230,.16)" }}>
                {x}
              </span>
            ))}
          </div>
          <div style={{ font: "600 9.5px/1 var(--f-ui)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--t-muted)", marginBottom: 11 }}>
            Steer clear of
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {p.avoid.map((x) => (
              <span key={x} style={{ font: "400 12.5px/1 var(--f-ui)", padding: "9px 14px", borderRadius: 999, color: "var(--t-faint)", border: "1px solid rgba(118,124,131,.3)", textDecoration: "line-through" }}>
                {x}
              </span>
            ))}
          </div>

          <Eyebrow style={{ margin: "28px 0 12px" }}>Their circle</Eyebrow>
          {suggestions.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 9 }}>
              {suggestions.map((s) => (
                <div
                  key={s.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "13px 15px",
                    background: "rgba(201,168,106,.07)",
                    border: "1px dashed rgba(201,168,106,.32)",
                    borderRadius: 14,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ font: "500 13.5px/1.1 var(--f-ui)", color: "var(--t-body)" }}>
                      {s.name} {s.tag && <span style={{ color: "var(--g)", fontWeight: 600 }}>· {s.tag}</span>}
                    </div>
                    <div style={{ font: "400 11.5px/1.3 var(--f-ui)", color: "#888e95", marginTop: 3 }}>
                      I noticed {s.note ?? "this name"} in what you told me — add to their circle?
                    </div>
                  </div>
                  <button
                    onClick={() => dismissSuggestion(s)}
                    className="focusring"
                    style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid rgba(220,226,230,.16)", background: "transparent", color: "var(--t-faint)", font: "500 12px/1 var(--f-ui)", cursor: "pointer" }}
                  >
                    Skip
                  </button>
                  <button
                    onClick={() => approveSuggestion(s)}
                    disabled={addingName === s.name}
                    className="focusring"
                    style={{ padding: "8px 12px", borderRadius: 10, border: "none", background: "var(--g)", color: "#15171c", font: "600 12px/1 var(--f-ui)", cursor: "pointer" }}
                  >
                    {addingName === s.name ? "Adding…" : "Add"}
                  </button>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {p.circle.map((c) => (
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
            {p.history.map((h, i) => (
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
            <span style={{ font: "500 13px/1.5 var(--f-display)", fontStyle: "italic", color: "var(--t-muted)" }}>{p.insight}</span>
          </div>
          <button
            onClick={() => navigate("/app/studio", { state: id ? { personId: id, personName: p.name } : undefined })}
            className="focusring"
            style={{ marginTop: 16, width: "100%", padding: 14, borderRadius: 12, background: "var(--g)", color: "#15171c", border: "none", font: "600 13px/1 var(--f-ui)", cursor: "pointer" }}
          >
            See this year's picks for {p.name} →
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
