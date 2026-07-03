import { useState } from "react";
import { api, type PersonDetail } from "../lib/api";

/* Edit an existing recipient's profile — life circumstances change (someone
   quits drinking, placeholder test content needs replacing with the real
   thing) and this is the only place to fix that without asking for a
   one-off script. Mirrors AddPersonModal's fields, pre-filled. */

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

export function EditPersonModal({
  person,
  onClose,
  onSaved,
}: {
  person: PersonDetail;
  onClose: () => void;
  onSaved: (person: PersonDetail) => void;
}) {
  const [name, setName] = useState(person.name);
  const [relation, setRelation] = useState(person.relation ?? "");
  const [birthday, setBirthday] = useState(person.birthday ?? "");
  const [anniversary, setAnniversary] = useState(person.anniversary ?? "");
  const [loves, setLoves] = useState(person.loves.join(", "));
  const [avoid, setAvoid] = useState(person.avoid.join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!name.trim() || saving) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await api.updatePerson(person.id, {
        name: name.trim(),
        relation: relation.trim() || undefined,
        birthday: birthday || undefined,
        anniversary: anniversary || undefined,
        loves: splitList(loves),
        avoid: splitList(avoid),
      });
      onSaved(updated);
    } catch {
      setError("Couldn't save — try again.");
      setSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Edit ${person.name}`}
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
          Edit <i>{person.name}</i>
        </h2>
        <p style={{ margin: "0 0 22px", font: "400 13.5px/1.5 var(--f-ui)", color: "var(--t-muted)" }}>
          Loves and avoids replace the current list — I'll rebuild their taste profile from what's here.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle} htmlFor="ep-name">Name</label>
            <input
              id="ep-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              autoFocus
              className="focusring"
              style={fieldStyle}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="ep-relation">Relation (optional)</label>
            <input
              id="ep-relation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              placeholder="Your wife · together 9 years"
              className="focusring"
              style={fieldStyle}
            />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle} htmlFor="ep-birthday">Birthday</label>
              <input
                id="ep-birthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="focusring"
                style={fieldStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle} htmlFor="ep-anniversary">Anniversary (optional)</label>
              <input
                id="ep-anniversary"
                type="date"
                value={anniversary}
                onChange={(e) => setAnniversary(e.target.value)}
                className="focusring"
                style={fieldStyle}
              />
            </div>
          </div>
          <div>
            <label style={labelStyle} htmlFor="ep-loves">Loves (comma-separated)</label>
            <input
              id="ep-loves"
              value={loves}
              onChange={(e) => setLoves(e.target.value)}
              placeholder="Ceramics, her garden, oat-milk lattes"
              className="focusring"
              style={fieldStyle}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="ep-avoid">Steer clear of (optional)</label>
            <input
              id="ep-avoid"
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
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
