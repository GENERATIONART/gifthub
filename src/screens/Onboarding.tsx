import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Onboarding — 5 steps (0–4). The right panel builds a live profile card as you
   fill each step (the emotional hook). Chips/tiers are interactive state. */

const promises = [
  { icon: "◔", text: "Never miss a date again" },
  { icon: "✦", text: "Picks that feel like them, not a catalogue" },
  { icon: "♥", text: "Chosen, bought, wrapped — you just approve" },
];
const relDefs = [
  { k: "wife", l: "Wife" },
  { k: "partner", l: "Partner" },
  { k: "mom", l: "Mom" },
  { k: "friend", l: "Close friend" },
  { k: "sister", l: "Sister" },
];
const loveDefs = [
  { k: "ceramics", l: "Ceramics" },
  { k: "garden", l: "Her garden" },
  { k: "biscuit", l: "Biscuit (dog)" },
  { k: "lattes", l: "Oat-milk lattes" },
  { k: "linen", l: "Linen everything" },
  { k: "hiking", l: "Hiking" },
  { k: "novels", l: "Novels" },
  { k: "jazz", l: "Jazz" },
];
const loveLabelMap: Record<string, string> = { ceramics: "Ceramics", garden: "Her garden", biscuit: "Biscuit", lattes: "Oat-milk lattes", linen: "Linen", hiking: "Hiking", novels: "Novels", jazz: "Jazz" };
const avoidDefs = [
  { k: "lilies", l: "Lilies — allergic" },
  { k: "jewelry", l: "Repeat jewelry" },
  { k: "fast", l: "Fast fashion" },
];
const budgetDefs = [
  { l: "Thoughtful", note: "$25 – $60" },
  { l: "Considered", note: "$60 – $120" },
  { l: "Generous", note: "$120 – $250" },
  { l: "No ceiling", note: "Ask me each time" },
];
const relMap: Record<string, string> = { wife: "Your wife", partner: "Your partner", mom: "Your mom", friend: "A close friend", sister: "Your sister" };
const budgetLabels = ["$25 – $60", "$60 – $120", "$120 – $250", "Ask each time"];
const hints = [
  "The more I know, the less you'll ever have to think about it. Nothing here is permanent — I keep learning.",
  "A name and a date is all I need to begin. I'll fill in the rest from your chats and past gifts.",
  "Tap freely — I treat these as a starting point, not a rulebook.",
  "Per-person budgets can override this later. This just sets my default instinct.",
];
const ctas = ["Get started", "Continue", "Continue", "That's my range", "Enter Fondly"];
const found = [
  { st: "done", text: "Pulled 3 more dates from your calendar", meta: "anniversary, Mom's birthday, Jake's recital" },
  { st: "done", text: "Started Sarah's taste profile", meta: "" },
  { st: "work", text: "Building her birthday shortlist now", meta: "10 gifts, ready in a moment" },
  { st: "work", text: "Matching dog-themed cards", meta: "so Biscuit can sign" },
];

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [relation, setRelation] = useState("wife");
  const [loves, setLoves] = useState<Record<string, boolean>>({ ceramics: true, garden: true, biscuit: true, lattes: false, linen: false, hiking: false, novels: false, jazz: false });
  const [avoids, setAvoids] = useState<Record<string, boolean>>({ lilies: true, jewelry: false, fast: false });
  const [budget, setBudget] = useState(1);

  const next = () => (step >= 4 ? navigate("/app") : setStep((s) => Math.min(s + 1, 4)));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const profLoves = Object.keys(loves).filter((k) => loves[k]).map((k) => loveLabelMap[k]);

  const chip = (on: boolean, kind?: "avoid"): React.CSSProperties =>
    kind === "avoid"
      ? {
          cursor: "pointer",
          font: "400 13px/1 var(--f-ui)",
          padding: "10px 15px",
          borderRadius: 999,
          border: "none",
          transition: "all .15s",
          ...(on
            ? { color: "var(--t-faint)", boxShadow: "inset 0 0 0 1px rgba(118,124,131,.4)", textDecoration: "line-through", background: "rgba(118,124,131,.08)" }
            : { color: "var(--t-muted)", boxShadow: "inset 0 0 0 1px rgba(118,124,131,.25)", background: "transparent" }),
        }
      : {
          cursor: "pointer",
          font: "500 13px/1 var(--f-ui)",
          padding: "10px 15px",
          borderRadius: 999,
          border: "none",
          transition: "all .15s",
          ...(on
            ? { background: "var(--g)", color: "#15171c", boxShadow: "inset 0 0 0 1px var(--g)" }
            : { background: "transparent", color: "#cfd3d7", boxShadow: "inset 0 0 0 1px rgba(220,226,230,.2)" }),
        };

  return (
    <div className="page onb" style={{ background: "var(--bg-app-alt)" }}>
      {/* wizard */}
      <div className="onb-form">
        <div style={{ flex: "none", display: "flex", alignItems: "center", gap: 18, marginBottom: 44, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo size={30} />
            <span style={{ font: "500 20px/1 var(--f-display)", color: "var(--t-primary)" }}>Fondly</span>
          </div>
          <div style={{ flex: 1, display: "flex", gap: 7, maxWidth: 280, minWidth: 120 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} style={{ flex: 1, height: 4, borderRadius: 999, transition: "all .3s", background: i <= step ? "var(--g)" : "rgba(220,226,230,.14)" }} />
            ))}
          </div>
          {step > 0 && step < 4 && (
            <span onClick={() => setStep(4)} style={{ font: "500 13px/1 var(--f-ui)", color: "var(--t-faintest)", cursor: "pointer" }}>
              Skip setup
            </span>
          )}
        </div>

        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 520 }}>
          {step === 0 && (
            <div style={{ animation: "fadeUp .5s ease both" }}>
              <h1 style={{ margin: 0, font: "400 clamp(40px,6vw,60px)/1.02 var(--f-display)", letterSpacing: "-.015em", color: "var(--t-primary)" }}>
                Gifting,<br />finally <i style={{ fontStyle: "italic", color: "var(--g)" }}>handled</i>.
              </h1>
              <p style={{ margin: "26px 0 0", font: "400 17px/1.6 var(--f-ui)", color: "var(--t-muted)", maxWidth: "46ch" }}>
                I'm Fondly — your gifting concierge. Tell me about the people you love, and I'll remember every date, learn
                every taste, and handle every gift end to end. Setup takes about a minute.
              </p>
              <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 15 }}>
                {promises.map((pr) => (
                  <div key={pr.text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ width: 30, height: 30, flex: "none", borderRadius: "50%", background: "rgba(201,168,106,.14)", color: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{pr.icon}</span>
                    <span style={{ font: "400 15px/1.4 var(--f-ui)", color: "#cfd3d7" }}>{pr.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ animation: "fadeUp .35s ease both" }}>
              <StepEyebrow>Step 1 · someone you love</StepEyebrow>
              <StepTitle>Who should I learn first?</StepTitle>
              <FieldLabel>Their name</FieldLabel>
              <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "16px 18px", borderRadius: 14, background: "var(--bg-card)", border: "1px solid var(--g)", marginBottom: 26, maxWidth: 400 }}>
                <span style={{ width: 38, height: 38, flex: "none", borderRadius: "50%", background: "#2a2f37", color: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center", font: "500 16px/1 var(--f-display)" }}>S</span>
                <span style={{ font: "500 18px/1 var(--f-ui)", color: "var(--t-primary)" }}>
                  Sarah
                  <span style={{ display: "inline-block", width: 2, height: 19, background: "var(--g)", marginLeft: 3, verticalAlign: -3, animation: "blink 1.1s step-end infinite" }} />
                </span>
              </div>
              <FieldLabel>Who is she to you?</FieldLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 26 }}>
                {relDefs.map((r) => (
                  <button key={r.k} onClick={() => setRelation(r.k)} className="focusring" style={chip(relation === r.k)}>
                    {r.l}
                  </button>
                ))}
              </div>
              <FieldLabel>Her birthday</FieldLabel>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", borderRadius: 14, background: "var(--bg-card)", border: "var(--line)", maxWidth: 400 }}>
                <span style={{ font: "500 17px/1 var(--f-ui)", color: "var(--t-primary)" }}>October 14</span>
                <span style={{ font: "400 14px/1 var(--f-ui)", color: "var(--g)" }}>in 12 days</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: "fadeUp .35s ease both" }}>
              <StepEyebrow>Step 2 · her taste</StepEyebrow>
              <StepTitle>What is Sarah into?</StepTitle>
              <p style={{ margin: "0 0 26px", font: "400 15px/1.5 var(--f-ui)", color: "var(--t-muted)", maxWidth: "44ch" }}>
                Tap what fits. I'll keep learning from your chats and past gifts — this is just a head start.
              </p>
              <div style={{ font: "600 10px/1 var(--f-ui)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--g)", marginBottom: 11 }}>She loves</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 26 }}>
                {loveDefs.map((l) => (
                  <button key={l.k} onClick={() => setLoves((s) => ({ ...s, [l.k]: !s[l.k] }))} className="focusring" style={chip(loves[l.k])}>
                    {l.l}
                  </button>
                ))}
              </div>
              <div style={{ font: "600 10px/1 var(--f-ui)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--t-muted)", marginBottom: 11 }}>Steer clear of</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {avoidDefs.map((a) => (
                  <button key={a.k} onClick={() => setAvoids((s) => ({ ...s, [a.k]: !s[a.k] }))} className="focusring" style={chip(avoids[a.k], "avoid")}>
                    {a.l}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ animation: "fadeUp .35s ease both" }}>
              <StepEyebrow>Step 3 · your comfort zone</StepEyebrow>
              <StepTitle>How much, usually?</StepTitle>
              <p style={{ margin: "0 0 26px", font: "400 15px/1.5 var(--f-ui)", color: "var(--t-muted)", maxWidth: "44ch" }}>
                A rough range for a birthday like Sarah's. I'll never spend past it without asking you first.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, maxWidth: 460 }}>
                {budgetDefs.map((b, i) => {
                  const on = budget === i;
                  return (
                    <button
                      key={b.l}
                      onClick={() => setBudget(i)}
                      className="focusring"
                      style={{ textAlign: "left", padding: 18, borderRadius: 14, cursor: "pointer", transition: "all .15s", background: "var(--bg-card)", border: `1px solid ${on ? "var(--g)" : "rgba(220,226,230,.1)"}`, boxShadow: on ? "0 0 0 1px var(--g)" : undefined }}
                    >
                      <span style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontSize: 12, fontWeight: 700, ...(on ? { background: "var(--g)", color: "#15171c" } : { border: "1.5px solid #3a3f47", color: "transparent" }) }}>
                        {on ? "✓" : ""}
                      </span>
                      <div style={{ font: "500 16px/1.1 var(--f-ui)", color: "var(--t-primary)", marginTop: 12 }}>{b.l}</div>
                      <div style={{ font: "400 12.5px/1.3 var(--f-ui)", color: "#888e95", marginTop: 4 }}>{b.note}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ animation: "fadeUp .45s ease both" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span style={{ position: "relative" }}>
                  <Logo size={40} />
                  <span style={{ position: "absolute", bottom: -1, right: -1, width: 12, height: 12, borderRadius: "50%", background: "#3ddc84", border: "2px solid var(--bg-app-alt)" }} />
                </span>
                <div style={{ font: "400 13px/1 var(--f-ui)", color: "#3ddc84" }}>Already working for you</div>
              </div>
              <h1 style={{ margin: "0 0 14px", font: "400 clamp(34px,4vw,46px)/1.05 var(--f-display)", color: "var(--t-primary)" }}>I'm on it, David.</h1>
              <p style={{ margin: 0, font: "400 16px/1.6 var(--f-ui)", color: "var(--t-muted)", maxWidth: "46ch" }}>
                Sarah's set up and I've already started. Everything I do from here shows up in the panel — you'll only hear
                from me when something's genuinely worth your time.
              </p>
            </div>
          )}
        </div>

        <div style={{ flex: "none", display: "flex", alignItems: "center", gap: 16, marginTop: 36 }}>
          {step > 0 && step < 4 && (
            <button onClick={back} className="focusring" style={{ padding: "15px 24px", borderRadius: 12, border: "1px solid rgba(220,226,230,.16)", background: "transparent", color: "#cfd3d7", font: "500 14px/1 var(--f-ui)", cursor: "pointer" }}>
              Back
            </button>
          )}
          <button onClick={next} className="focusring" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 30px", borderRadius: 12, background: "var(--g)", color: "#15171c", border: "none", font: "600 15px/1 var(--f-ui)", cursor: "pointer" }}>
            {ctas[step]} <span style={{ fontSize: 15 }}>→</span>
          </button>
        </div>
      </div>

      {/* live profile / concierge panel */}
      <div className="onb-panel">
        <div style={{ font: "600 9.5px/1 var(--f-ui)", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--t-dim)", marginBottom: 22 }}>
          {step === 0 ? "A glimpse of what I build" : step === 4 ? "What I'm doing right now" : "Learning as you go"}
        </div>

        {step <= 3 && (
          <div style={{ borderRadius: 22, background: "var(--bg-card)", border: "var(--line)", padding: 28, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
              <span style={{ width: 64, height: 64, flex: "none", borderRadius: "50%", background: "#2a2f37", color: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center", font: "400 28px/1 var(--f-display)" }}>S</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: "400 26px/1 var(--f-display)", color: "var(--t-primary)" }}>Sarah</div>
                <div style={{ font: "400 13px/1 var(--f-ui)", color: "#888e95", marginTop: 7 }}>{relMap[relation]} · birthday Oct 14</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ font: "400 24px/1 var(--f-display)", color: "var(--g)" }}>12</div>
                <div style={{ font: "500 9px/1 var(--f-ui)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--t-faint)", marginTop: 4 }}>days</div>
              </div>
            </div>
            {(step === 0 || step >= 2) && (
              <>
                <div style={{ font: "600 9.5px/1 var(--f-ui)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--g)", marginBottom: 11 }}>Loves</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18, minHeight: 34 }}>
                  {(step === 0 ? ["Ceramics", "Her garden", "Biscuit"] : profLoves).map((x) => (
                    <span key={x} style={{ font: "500 12.5px/1 var(--f-ui)", padding: "8px 13px", borderRadius: 999, background: "rgba(220,226,230,.08)", color: "var(--t-body)", border: "1px solid rgba(220,226,230,.16)", animation: "fadeUp .3s ease both" }}>
                      {x}
                    </span>
                  ))}
                </div>
              </>
            )}
            {(step === 0 || step >= 3) && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 13, background: "var(--bg-screen)", border: "var(--line-subtle)" }}>
                <span style={{ font: "500 12.5px/1 var(--f-ui)", color: "var(--t-muted)" }}>Comfortable spend for her</span>
                <span style={{ font: "400 15px/1 var(--f-display)", color: "var(--g)" }}>{budgetLabels[budget]}</span>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "14px 16px", borderRadius: 12, background: "rgba(201,168,106,.08)", border: "1px solid rgba(201,168,106,.2)", marginBottom: 20 }}>
              <span style={{ width: 13, height: 13, flex: "none", borderRadius: "50%", border: "2px solid var(--g)", borderTopColor: "transparent", animation: "spin .9s linear infinite" }} />
              <span style={{ font: "500 13px/1.4 var(--f-ui)", color: "var(--t-body)" }}>Building Sarah's birthday shortlist…</span>
            </div>
            {found.map((f, i) => {
              const done = f.st === "done";
              const meta = f.text.includes("taste profile") ? `${profLoves.length} loves noted` : f.meta;
              return (
                <div key={i} style={{ display: "flex", gap: 13, paddingBottom: 18 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                    <span style={{ width: 18, height: 18, flex: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", font: "700 9px/1 var(--f-ui)", ...(done ? { background: "rgba(110,174,142,.18)", color: "#7fc3a0" } : { background: "transparent", border: "1.5px solid var(--g)", color: "var(--g)" }) }}>
                      {done ? "✓" : ""}
                    </span>
                    {i < found.length - 1 && <span style={{ width: 1.5, flex: 1, minHeight: 14, background: "rgba(220,226,230,.12)", margin: "3px 0" }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ font: "500 14px/1.4 var(--f-ui)", color: done ? "var(--t-secondary)" : "var(--t-primary)" }}>{f.text}</div>
                    {meta && <div style={{ font: "400 12px/1.4 var(--f-ui)", color: "var(--t-faintest)", marginTop: 4 }}>{meta}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {step < 4 && (
          <div style={{ marginTop: "auto", padding: "18px 20px", borderRadius: 16, border: "1px dashed rgba(220,226,230,.14)", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--g)", flex: "none", marginTop: 6 }} />
            <span style={{ font: "500 14px/1.55 var(--f-display)", fontStyle: "italic", color: "var(--t-muted)" }}>{hints[step]}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function StepEyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ font: "500 11px/1 var(--f-ui)", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--g)", marginBottom: 14 }}>{children}</div>;
}
function StepTitle({ children }: { children: React.ReactNode }) {
  return <h1 style={{ margin: "0 0 26px", font: "400 clamp(30px,4vw,42px)/1.06 var(--f-display)", color: "var(--t-primary)" }}>{children}</h1>;
}
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ font: "600 10px/1 var(--f-ui)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--t-faint)", marginBottom: 10 }}>{children}</div>;
}
function Logo({ size }: { size: number }) {
  return (
    <span style={{ width: size, height: size, borderRadius: "50%", border: "1px solid var(--g)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--g)", font: `400 ${Math.round(size * 0.5)}px/1 var(--f-display)` }}>
      f
    </span>
  );
}
