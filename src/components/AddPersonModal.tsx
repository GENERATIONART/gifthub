import { useState } from "react";
import { api, type PersonDetail } from "../lib/api";

/* Modal for adding a new gift recipient. A name and a birthday is enough to
   begin — the backend turns that into a person + occasion + starter project,
   so they show up on Home and Calendar immediately. */

function splitList(s: string): string[] {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 11,
  background: "var(--bg-screen)",
  border: "1px solid rgba(220,226,230,.14)",
  color: "var(--t-primary)",
  font: "500 14px/1 var(--f-ui)",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  font: "600 9.5px/1 var(--f-ui)",
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "var(--t-faint)",
  marginBottom: 8,
};

export function AddPersonModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (person: PersonDetail) => void;
}) {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [anniversary, setAnniversary] = useState("");
  const [loves, setLoves] = useState("");
  const [avoid, setAvoid] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!name.trim() || saving) return;
    setSaving(true);
    setError(null);
    try {
      const person = await api.createPerson({
        name: name.trim(),
        relation: relation.trim() || undefined,
        birthday: birthday || undefined,
        anniversary: anniversary || undefined,
        loves: splitList(loves),
        avoid: splitList(avoid),
      });
      onCreated(person);
    } catch {
      setError("Couldn't save — try again.");
      setSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Add someone to gift"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(10,11,13,.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 440,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 20,
          background: "var(--bg-card)",
          border: "1px solid rgba(220,226,230,.14)",
          padding: 26,
          animation: "fadeUp .25s ease both",
        }}
      >
        <h2 style={{ margin: "0 0 6px", font: "400 24px/1.2 var(--f-display)", color: "var(--t-primary)" }}>
          Who do you <i>gift</i>?
        </h2>
        <p style={{ margin: "0 0 22px", font: "400 13.5px/1.5 var(--f-ui)", color: "var(--t-muted)" }}>
          A name and a birthday is enough for me to begin. I'll build their taste profile as you go.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle} htmlFor="ap-name">Name</label>
            <input
              id="ap-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Sarah"
              autoFocus
              className="focusring"
              style={fieldStyle}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="ap-relation">Relation (optional)</label>
            <input
              id="ap-relation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              placeholder="Your wife · together 9 years"
              className="focusring"
              style={fieldStyle}
            />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle} htmlFor="ap-birthday">Birthday</label>
              <input
                id="ap-birthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="focusring"
                style={fieldStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle} htmlFor="ap-anniversary">Anniversary (optional)</label>
              <input
                id="ap-anniversary"
                type="date"
                value={anniversary}
                onChange={(e) => setAnniversary(e.target.value)}
                className="focusring"
                style={fieldStyle}
              />
            </div>
          </div>
          <div>
            <label style={labelStyle} htmlFor="ap-loves">Loves (comma-separated)</label>
            <input
              id="ap-loves"
              value={loves}
              onChange={(e) => setLoves(e.target.value)}
              placeholder="Ceramics, her garden, oat-milk lattes"
              className="focusring"
              style={fieldStyle}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="ap-avoid">Steer clear of (optional)</label>
            <input
              id="ap-avoid"
              value={avoid}
              onChange={(e) => setAvoid(e.target.value)}
              placeholder="Lilies, repeat jewelry"
              className="focusring"
              style={fieldStyle}
            />
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 14, font: "400 12.5px/1.4 var(--f-ui)", color: "#d99a9a" }}>{error}</div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <button
            onClick={onClose}
            className="focusring"
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 12,
              border: "1px solid rgba(220,226,230,.16)",
              background: "transparent",
              color: "var(--t-body)",
              font: "500 13.5px/1 var(--f-ui)",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!name.trim() || saving}
            className="focusring"
            style={{
              flex: 2,
              padding: 14,
              borderRadius: 12,
              border: "none",
              background: name.trim() ? "var(--g)" : "var(--surface-raised)",
              color: name.trim() ? "#15171c" : "var(--t-dim)",
              font: "600 13.5px/1 var(--f-ui)",
              cursor: name.trim() && !saving ? "pointer" : "default",
            }}
          >
            {saving ? "Adding…" : "Add & start learning them"}
          </button>
        </div>
      </div>
    </div>
  );
}
