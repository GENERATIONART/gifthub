import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Auth — passwordless magic-link, primary flow. States: signin | create | sent.
   Split layout (form left, brand panel right); brand hides on mobile. */

type Mode = "signin" | "create" | "sent";

const promises = [
  { icon: "◔", text: "Never miss a date again" },
  { icon: "✦", text: "Picks that feel like them, not a catalogue" },
  { icon: "♥", text: "Chosen, bought, wrapped — you just approve" },
];

export function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const isCreate = mode === "create";

  return (
    <div className="page duo" style={{ background: "var(--bg-app-alt)" }}>
      {/* form */}
      <div className="duo-form">
        <Link to="/" style={{ flex: "none", display: "flex", alignItems: "center", gap: 11 }}>
          <Logo size={30} />
          <span style={{ font: "500 20px/1 var(--f-display)", color: "var(--t-primary)" }}>Fondly</span>
        </Link>

        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 440, width: "100%", padding: "40px 0" }}>
          {mode !== "sent" ? (
            <div style={{ animation: "fadeUp .45s ease both" }}>
              <h1 style={{ margin: 0, font: "400 clamp(38px,5vw,52px)/1.03 var(--f-display)", letterSpacing: "-.015em", color: "var(--t-primary)" }}>
                {isCreate ? "Claim your invitation." : "Welcome back."}
              </h1>
              <p style={{ margin: "20px 0 32px", font: "400 16px/1.6 var(--f-ui)", color: "var(--t-muted)", maxWidth: "42ch" }}>
                {isCreate
                  ? "You've been invited to Fondly. Enter your code and email — I'll send a link to finish setting up your account."
                  : "Enter your email and I'll send you a link to sign in. No password to remember, nothing to reset."}
              </p>

              {isCreate && (
                <>
                  <FieldLabel>Invitation code</FieldLabel>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", borderRadius: 14, background: "var(--bg-card)", border: "1px solid rgba(201,168,106,.4)", marginBottom: 18 }}>
                    <span style={{ font: "500 18px/1 var(--f-ui)", letterSpacing: ".24em", color: "var(--t-primary)" }}>FOND-9K2P</span>
                    <span style={{ marginLeft: "auto", font: "600 9.5px/1 var(--f-ui)", letterSpacing: ".08em", textTransform: "uppercase", color: "#7fc3a0" }}>✓ Valid invite</span>
                  </div>
                </>
              )}

              <FieldLabel>Email address</FieldLabel>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", borderRadius: 14, background: "var(--bg-card)", border: "1px solid var(--g)" }}>
                <span style={{ font: "500 17px/1 var(--f-ui)", color: "var(--t-primary)" }}>
                  david.mercer@gmail.com
                  <span style={{ display: "inline-block", width: 2, height: 18, background: "var(--g)", marginLeft: 2, verticalAlign: -3, animation: "blink 1.1s step-end infinite" }} />
                </span>
              </div>

              <button
                onClick={() => (isCreate ? navigate("/onboarding") : setMode("sent"))}
                className="focusring"
                style={{ marginTop: 20, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: 17, borderRadius: 13, background: "var(--g)", color: "#15171c", border: "none", font: "600 15px/1 var(--f-ui)", cursor: "pointer" }}
              >
                Email me a sign-in link <span style={{ fontSize: 15 }}>→</span>
              </button>
              <div style={{ marginTop: 13, textAlign: "center", font: "400 13px/1.5 var(--f-ui)", color: "var(--t-faintest)" }}>
                No password to remember — the link signs you in.
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "26px 0" }}>
                <span style={{ flex: 1, height: 1, background: "rgba(220,226,230,.1)" }} />
                <span style={{ font: "400 11px/1 var(--f-ui)", color: "var(--t-dim)", letterSpacing: ".08em" }}>OR</span>
                <span style={{ flex: 1, height: 1, background: "rgba(220,226,230,.1)" }} />
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { label: "Apple", mark: "", light: true },
                  { label: "Google", mark: "G", light: false },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => navigate("/app")}
                    className="focusring"
                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: 15, borderRadius: 13, background: "var(--bg-card)", border: "1px solid rgba(220,226,230,.14)", cursor: "pointer" }}
                  >
                    <span style={{ width: 22, height: 22, flex: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", font: "600 14px/1 var(--f-ui)", background: s.light ? "#f3f5f3" : "transparent", color: s.light ? "#15171c" : "var(--t-body)" }}>
                      {s.mark || "" }
                    </span>
                    <span style={{ font: "500 14px/1 var(--f-ui)", color: "var(--t-body)" }}>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ animation: "fadeUp .45s ease both" }}>
              <div style={{ width: 86, height: 86, borderRadius: "50%", background: "rgba(201,168,106,.1)", border: "1px solid rgba(201,168,106,.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "var(--g)", marginBottom: 32 }}>✉</div>
              <h1 style={{ margin: 0, font: "400 clamp(38px,5vw,52px)/1.04 var(--f-display)", color: "var(--t-primary)" }}>
                Check your <i style={{ fontStyle: "italic", color: "var(--g)" }}>inbox</i>.
              </h1>
              <p style={{ margin: "20px 0 30px", font: "400 16px/1.65 var(--f-ui)", color: "var(--t-muted)", maxWidth: "44ch" }}>
                I sent a sign-in link to <span style={{ color: "var(--t-primary)" }}>david.mercer@gmail.com</span>. Tap it and
                you're in — it's good for the next 15 minutes.
              </p>
              <div style={{ display: "flex", gap: 12, maxWidth: 400, flexWrap: "wrap" }}>
                <button onClick={() => navigate("/app")} className="focusring" style={{ flex: 1, minWidth: 140, textAlign: "center", padding: 16, borderRadius: 13, background: "var(--bg-card)", border: "1px solid rgba(220,226,230,.16)", font: "500 14px/1 var(--f-ui)", color: "var(--t-body)", cursor: "pointer" }}>
                  Open Mail
                </button>
                <button onClick={() => setMode("signin")} className="focusring" style={{ flex: 1, minWidth: 140, textAlign: "center", padding: 16, borderRadius: 13, border: "1px solid rgba(220,226,230,.16)", background: "transparent", font: "500 14px/1 var(--f-ui)", color: "#cfd3d7", cursor: "pointer" }}>
                  Resend link
                </button>
              </div>
              <div style={{ marginTop: 24, font: "400 13.5px/1.5 var(--f-ui)", color: "var(--t-faintest)" }}>
                Wrong address?{" "}
                <span onClick={() => setMode("signin")} style={{ color: "var(--g)", fontWeight: 500, cursor: "pointer" }}>
                  Use a different email
                </span>
              </div>
            </div>
          )}
        </div>

        {mode !== "sent" && (
          <div style={{ flex: "none", font: "400 13px/1.5 var(--f-ui)", color: "var(--t-muted)" }}>
            {isCreate ? "Already a member?" : "Have an invitation?"}{" "}
            <span onClick={() => setMode(isCreate ? "signin" : "create")} style={{ color: "var(--g)", fontWeight: 500, cursor: "pointer" }}>
              {isCreate ? "Sign in instead" : "Create your account"}
            </span>
          </div>
        )}
      </div>

      {/* brand panel */}
      <div className="duo-brand" style={{ background: "linear-gradient(155deg,#1b1f26,#101216 60%)", borderLeft: "var(--line-faint)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 72px" }}>
        <div style={{ position: "absolute", top: -120, right: -120, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,106,.14), transparent 70%)" }} />
        <div style={{ position: "relative" }}>
          <div className="eyebrow-accent" style={{ letterSpacing: ".2em", marginBottom: 26 }}>By invitation</div>
          <div style={{ font: "400 clamp(30px,3vw,44px)/1.2 var(--f-display)", fontStyle: "italic", color: "#e6e8e6", maxWidth: "18ch" }}>
            “I haven't forgotten a birthday in a year. My wife thinks I've become <span style={{ color: "var(--g)" }}>thoughtful</span>.”
          </div>
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 13 }}>
            <span style={{ width: 44, height: 44, borderRadius: "50%", background: "#2a2f37", color: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center", font: "400 18px/1 var(--f-display)" }}>D</span>
            <div>
              <div style={{ font: "500 15px/1.1 var(--f-ui)", color: "var(--t-primary)" }}>David Mercer</div>
              <div style={{ font: "400 12.5px/1 var(--f-ui)", color: "#888e95", marginTop: 4 }}>Member since 2025</div>
            </div>
          </div>
          <div style={{ marginTop: 52, display: "flex", flexDirection: "column", gap: 15, maxWidth: "36ch" }}>
            {promises.map((p) => (
              <div key={p.text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ width: 28, height: 28, flex: "none", borderRadius: "50%", background: "rgba(201,168,106,.14)", color: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>{p.icon}</span>
                <span style={{ font: "400 14.5px/1.4 var(--f-ui)", color: "#cfd3d7" }}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ font: "600 10px/1 var(--f-ui)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--t-faint)", marginBottom: 10 }}>{children}</div>;
}

function Logo({ size }: { size: number }) {
  return (
    <span style={{ width: size, height: size, borderRadius: "50%", border: "1px solid var(--g)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--g)", font: `400 ${Math.round(size * 0.53)}px/1 var(--f-display)` }}>
      f
    </span>
  );
}
