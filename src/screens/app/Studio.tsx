import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImgWell } from "../../components/ui";
import { api, type ScoredGift } from "../../lib/api";
import { isLive } from "../../lib/supabase";

interface StudioState {
  personId?: string;
  occasionId?: string | null;
  personName?: string;
}

interface Pick {
  id?: string;
  name: string;
  price: string;
  img: string;
  why: string;
  top?: boolean;
}

const NEUTRAL = { feel: 0, spend: 0, form: 0, risk: 0 };

export function Studio() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as StudioState | null) ?? {};

  const [personId, setPersonId] = useState<string | null>(state.personId ?? null);
  const [occasionId, setOccasionId] = useState<string | null | undefined>(state.occasionId);
  const [personName, setPersonName] = useState<string>(state.personName ?? "");
  const [live, setLive] = useState<ScoredGift[] | null>(null);
  const [loading, setLoading] = useState(false);

  // No person passed in (e.g. direct nav) — default to whoever needs a decision first.
  useEffect(() => {
    if (!isLive || personId) return;
    api
      .home()
      .then((h) => {
        const first = h.needs_you[0];
        if (first?.person_id) {
          setPersonId(first.person_id);
          setOccasionId(first.occasion_id);
          setPersonName(first.who);
        }
      })
      .catch(() => {});
  }, [personId]);

  useEffect(() => {
    if (!isLive || !personId) return;
    let cancelled = false;
    setLoading(true);
    api
      .refine(personId, NEUTRAL, { limit: 6, rerank: false })
      .then((r) => !cancelled && setLive(r))
      .catch(() => !cancelled && setLive(null))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [personId]);

  const picks: Pick[] = live
    ? live.map((g, i) => ({ id: g.id, name: g.name, price: g.price, img: g.img ?? "", why: g.why ?? "", top: i === 0 }))
    : [];

  return (
    <div className="screen">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 6, flexWrap: "wrap" }}>
        <div>
          {personName && <div className="eyebrow-accent">{personName}</div>}
          <h1 className="hero" style={{ margin: "13px 0 0" }}>
            Gifts, <i>chosen</i> for them.
          </h1>
        </div>
        <button
          onClick={() => navigate("/app/refine")}
          className="focusring"
          style={{
            padding: "11px 18px",
            borderRadius: 11,
            border: "1px solid rgba(220,226,230,.18)",
            background: "transparent",
            color: "var(--t-body)",
            font: "500 13px/1 var(--f-ui)",
            cursor: "pointer",
          }}
        >
          Not quite it? Steer me →
        </button>
      </div>
      <p className="lede" style={{ margin: "14px 0 30px", maxWidth: "52ch" }}>
        Weighted toward what they actually love, not just their category. Each comes with why I picked it.
      </p>

      {picks.length === 0 && (
        <p style={{ font: "400 13.5px/1.5 var(--f-ui)", color: "var(--t-faint)" }}>
          {loading ? "Curating…" : "No picks yet — add someone with a few loves and I'll build a shortlist."}
        </p>
      )}

      <div className="grid-3">
        {picks.map((g, i) => (
          <div
            key={g.id ?? g.name}
            data-pick
            className="pick-card focusring"
            role="button"
            tabIndex={0}
            onClick={() =>
              navigate("/app/approve", {
                // Only carry a real gift id through when it came from the live API —
                // seed fallback picks (shown while live data is still loading) aren't orderable.
                state: personId && live ? { personId, occasionId, personName, gift: g } : undefined,
              })
            }
            style={{
              cursor: "pointer",
              overflow: "hidden",
              borderRadius: 18,
              background: "var(--bg-card)",
              border: `1px solid ${g.top ? "var(--g)" : "rgba(220,226,230,.1)"}`,
              boxShadow: g.top ? "0 0 0 1px rgba(201,168,106,.18)" : undefined,
              animation: "riseIn .5s cubic-bezier(.2,.7,.3,1) both",
              animationDelay: `${i * 70}ms`,
            }}
          >
            <ImgWell label={g.img} height={150} style={{ font: "500 7.5px/1.3 var(--f-mono)", letterSpacing: ".06em" }}>
              {g.top && (
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    font: "600 9px/1 var(--f-ui)",
                    letterSpacing: ".14em",
                    color: "#15171c",
                    background: "var(--g)",
                    padding: "6px 10px",
                    borderRadius: 999,
                  }}
                >
                  ◆ TOP PICK
                </span>
              )}
            </ImgWell>
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                <span style={{ font: "500 16px/1.15 var(--f-display)", color: "var(--t-primary)" }}>{g.name}</span>
                <span style={{ font: "500 13px/1 var(--f-display)", color: "#cfd3d7", flex: "none" }}>{g.price}</span>
              </div>
              <p style={{ margin: "8px 0 0", font: "400 12px/1.5 var(--f-ui)", color: "#888e95" }}>{g.why}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
