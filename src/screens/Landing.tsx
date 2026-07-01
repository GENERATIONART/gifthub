import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../components/ui";

/* Marketing landing — tall-scroll, responsive. CTA everywhere → Auth. */

const navLinks = ["How it works", "Membership", "Stories"];
const faces: [string, string, string][] = [
  ["S", "#2a2f37", "var(--g)"],
  ["M", "#2e2a37", "#b79cf0"],
  ["J", "#262d35", "#8ba6c4"],
  ["+", "#23262d", "#9aa0a7"],
];
const press = ["Kinfolk", "Monocle", "GQ", "Cereal"];
const steps = [
  { num: "01", icon: "❍", title: "Add your people", body: "A name and a date is enough. Fondly quietly builds a taste profile for each person from your chats and past gifts." },
  { num: "02", icon: "✦", title: "Get a shortlist that fits", body: "Not a catalogue — a handful of gifts that feel like them, in your budget, with the reasoning shown." },
  { num: "03", icon: "♥", title: "Approve, and forget it", body: "Fondly buys, wraps, adds a signed card, and tracks delivery. You'll only hear back if it needs you." },
];
const handled = [
  { text: "Locked a $9 price drop on Sarah's planter", tag: "Mon" },
  { text: "Rerouted Dad's gift around a delay", tag: "Tue" },
  { text: "Held two inns for your anniversary", tag: "Wed" },
  { text: "Added a dog-themed card so Biscuit could sign", tag: "Thu" },
];
const bullets = [
  "Single-use cards — your real card never touches a merchant",
  "Auto-approve small gifts; always asks on the big ones",
  "Never repeats a gift, ever — it remembers all of them",
];
const plans = [
  { name: "Individual", price: "$18", per: "/mo", note: "For the person you never want to let down.", cta: "Request an invite", featured: false, features: ["Up to 3 people", "Unlimited occasions", "Concierge picks & approval", "Signed cards included"] },
  { name: "Household", price: "$32", per: "/mo", note: "Everyone under one roof, remembered.", cta: "Request an invite", featured: true, features: ["Up to 12 people", "Shared gift memory", "Joint gifts & split budgets", "Priority sourcing"] },
  { name: "Bespoke", price: "Let's talk", per: "", note: "For large families and busy calendars.", cta: "Contact us", featured: false, features: ["Unlimited people", "A dedicated human concierge", "Rare & made-to-order gifts", "White-glove wrapping"] },
];
const footerLinks = ["Privacy", "Terms", "Careers", "Contact"];

export function Landing() {
  const navigate = useNavigate();
  const invite = () => navigate("/auth");

  return (
    <div className="page" style={{ background: "var(--bg-screen)" }}>
      <div className="lp">
        {/* nav */}
        <div className="lp-pad" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "26px 64px", borderBottom: "1px solid rgba(220,226,230,.06)" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <Logo size={30} />
            <span style={{ font: "500 21px/1 var(--f-display)", color: "var(--t-primary)" }}>Fondly</span>
          </Link>
          <div className="lp-navlinks">
            {navLinks.map((l) => (
              <a key={l} href="#" style={{ font: "400 14px/1 var(--f-ui)", color: "var(--t-muted)" }}>
                {l}
              </a>
            ))}
            <button onClick={() => navigate("/auth")} className="focusring" style={{ font: "600 13px/1 var(--f-ui)", color: "#15171c", background: "var(--g)", padding: "12px 22px", borderRadius: 10, border: "none", cursor: "pointer" }}>
              Request an invite
            </button>
          </div>
        </div>

        {/* hero */}
        <div className="lp-hero lp-pad" style={{ padding: "80px 64px 70px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "8px 15px", borderRadius: 999, border: "1px solid rgba(201,168,106,.3)", marginBottom: 30 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3ddc84" }} />
              <span style={{ font: "500 12px/1 var(--f-ui)", letterSpacing: ".04em", color: "#cfd3d7" }}>Your gifting concierge — by invitation</span>
            </div>
            <h1 className="lp-h1">
              The gift was perfect. You barely <i style={{ fontStyle: "italic", color: "var(--g)" }}>lifted</i> a finger.
            </h1>
            <p style={{ margin: "30px 0 0", font: "400 18px/1.6 var(--f-ui)", color: "var(--t-muted)", maxWidth: "44ch" }}>
              Fondly remembers every birthday, learns what the people you love actually want, and handles the gift end to
              end — chosen, bought, wrapped. You just approve.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 38, flexWrap: "wrap" }}>
              <button onClick={invite} className="focusring" style={{ font: "600 15px/1 var(--f-ui)", color: "#15171c", background: "var(--g)", padding: "17px 32px", borderRadius: 12, border: "none", cursor: "pointer" }}>
                Request an invite
              </button>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 9, font: "500 15px/1 var(--f-ui)", color: "#cfd3d7", cursor: "pointer" }}>
                See how it works <span style={{ color: "var(--g)" }}>→</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 40 }}>
              <div style={{ display: "flex" }}>
                {faces.map((f, i) => (
                  <span key={i} style={{ marginLeft: i ? -11 : 0, border: "2px solid var(--bg-screen)", borderRadius: "50%" }}>
                    <Avatar initial={f[0]} bg={f[1]} fg={f[2]} size={36} />
                  </span>
                ))}
              </div>
              <span style={{ font: "400 13.5px/1.5 var(--f-ui)", color: "#888e95" }}>
                Trusted by 2,400 people who never miss a moment.
              </span>
            </div>
          </div>

          {/* floating product card */}
          <div className="lp-hero-card" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 330, maxWidth: "100%", borderRadius: 34, background: "#0f1115", border: "var(--line)", padding: "26px 24px", boxShadow: "0 40px 90px rgba(0,0,0,.5)", animation: "pulse 6s ease-in-out infinite" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ position: "relative" }}>
                  <Logo size={32} />
                  <span style={{ position: "absolute", bottom: -1, right: -1, width: 9, height: 9, borderRadius: "50%", background: "#3ddc84", border: "2px solid #0f1115" }} />
                </span>
                <span style={{ font: "400 12px/1 var(--f-ui)", color: "#3ddc84" }}>Working on Sarah's birthday</span>
              </div>
              <div style={{ font: "400 22px/1.2 var(--f-display)", color: "var(--t-primary)", marginBottom: 6 }}>A hand-thrown ceramic set</div>
              <div style={{ font: "400 13px/1.4 var(--f-ui)", color: "#888e95", marginBottom: 18 }}>Matches her pottery studio. In her palette.</div>
              <div style={{ borderRadius: 16, overflow: "hidden", height: 150, background: "linear-gradient(135deg,#2a2f37,#191c22)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, border: "var(--line-subtle)" }}>
                <span style={{ font: "400 15px/1 var(--f-display)", fontStyle: "italic", color: "var(--t-dim)" }}>studio ceramics</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ font: "400 20px/1 var(--f-display)", color: "var(--t-primary)" }}>$88</span>
                <span style={{ font: "500 11px/1 var(--f-ui)", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--g)" }}>Within budget</span>
              </div>
              <div style={{ display: "flex", gap: 9 }}>
                <div style={{ flex: 1, textAlign: "center", padding: 13, borderRadius: 11, background: "var(--g)", color: "#15171c", font: "600 13px/1 var(--f-ui)" }}>Approve & send</div>
                <div style={{ padding: "13px 16px", borderRadius: 11, border: "1px solid rgba(220,226,230,.16)", color: "#cfd3d7", font: "500 13px/1 var(--f-ui)" }}>Refine</div>
              </div>
            </div>
          </div>
        </div>

        {/* press */}
        <div className="lp-pad" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 52, padding: "26px 64px", borderBlock: "1px solid rgba(220,226,230,.06)", flexWrap: "wrap" }}>
          <span style={{ font: "400 12px/1 var(--f-ui)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--t-dim)" }}>As featured in</span>
          {press.map((p) => (
            <span key={p} style={{ font: "500 18px/1 var(--f-display)", color: "var(--t-faintest)" }}>
              {p}
            </span>
          ))}
        </div>

        {/* how it works */}
        <div className="lp-section" style={{ textAlign: "center", paddingBottom: 40 }}>
          <div className="eyebrow-accent">How it works</div>
          <h2 className="lp-h2" style={{ margin: "16px auto 0", maxWidth: "20ch" }}>
            Tell me once. I remember <i style={{ fontStyle: "italic", color: "var(--g)" }}>forever</i>.
          </h2>
        </div>
        <div className="lp-3 lp-pad" style={{ paddingBottom: 20 }}>
          {steps.map((s) => (
            <div key={s.num} style={{ padding: "34px 30px", borderRadius: 22, background: "var(--bg-card)", border: "var(--line-subtle)" }}>
              <div style={{ font: "400 15px/1 var(--f-display)", color: "var(--g)", marginBottom: 22 }}>{s.num}</div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(201,168,106,.12)", color: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 20 }}>{s.icon}</div>
              <div style={{ font: "500 21px/1.2 var(--f-display)", color: "var(--t-primary)", marginBottom: 11 }}>{s.title}</div>
              <div style={{ font: "400 14.5px/1.6 var(--f-ui)", color: "var(--t-muted)" }}>{s.body}</div>
            </div>
          ))}
        </div>

        {/* feature split */}
        <div className="lp-split lp-pad" style={{ padding: "88px 64px" }}>
          <div style={{ borderRadius: 24, background: "var(--bg-bar)", border: "var(--line-subtle)", padding: 34 }}>
            <div style={{ font: "600 10px/1 var(--f-ui)", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--t-dim)", marginBottom: 20 }}>This week · handled without you</div>
            {handled.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 0", borderBottom: "var(--line-faint)" }}>
                <span style={{ width: 24, height: 24, flex: "none", borderRadius: "50%", background: "rgba(110,174,142,.16)", color: "#7fc3a0", display: "flex", alignItems: "center", justifyContent: "center", font: "700 11px/1 var(--f-ui)" }}>✓</span>
                <span style={{ flex: 1, font: "500 14.5px/1.3 var(--f-ui)", color: "var(--t-body)" }}>{h.text}</span>
                <span style={{ font: "400 12.5px/1 var(--f-ui)", color: "var(--t-faintest)", flex: "none" }}>{h.tag}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="eyebrow-accent" style={{ marginBottom: 18 }}>A concierge, not a store</div>
            <h2 className="lp-h2" style={{ marginBottom: 20 }}>It works quietly in the background.</h2>
            <p style={{ margin: "0 0 26px", font: "400 16px/1.65 var(--f-ui)", color: "var(--t-muted)", maxWidth: "44ch" }}>
              Fondly watches the dates, the price drops, the shipping delays — and fixes them before you'd ever notice. You
              set the guardrails once; inside them, it simply acts.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {bullets.map((b) => (
                <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 13 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--g)", flex: "none", marginTop: 7 }} />
                  <span style={{ font: "400 15px/1.5 var(--f-ui)", color: "#cfd3d7" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* testimonial */}
        <div className="lp-pad" style={{ padding: "80px 64px", textAlign: "center", borderBlock: "1px solid rgba(220,226,230,.06)" }}>
          <div style={{ font: "400 clamp(26px,3vw,40px)/1.4 var(--f-display)", fontStyle: "italic", color: "#e6e8e6", maxWidth: "24ch", margin: "0 auto" }}>
            “I haven't forgotten a birthday in a year. My wife thinks I've become <span style={{ color: "var(--g)" }}>thoughtful</span>.”
          </div>
          <div style={{ marginTop: 28, font: "500 14px/1 var(--f-ui)", color: "var(--t-muted)" }}>David M. · member since 2025</div>
        </div>

        {/* pricing */}
        <div className="lp-section" style={{ textAlign: "center", paddingBottom: 40 }}>
          <div className="eyebrow-accent">Membership</div>
          <h2 className="lp-h2" style={{ margin: "16px 0 0" }}>One plan. Everyone you love.</h2>
        </div>
        <div className="lp-3 lp-pad" style={{ paddingBottom: 20, alignItems: "stretch" }}>
          {plans.map((p) => (
            <div
              key={p.name}
              style={{
                padding: "34px 30px",
                borderRadius: 22,
                background: p.featured ? "#1d2027" : "var(--bg-card)",
                border: `1px solid ${p.featured ? "var(--g)" : "rgba(220,226,230,.08)"}`,
                boxShadow: p.featured ? "0 0 0 1px var(--g)" : undefined,
              }}
            >
              {p.featured && (
                <div style={{ font: "600 9.5px/1 var(--f-ui)", letterSpacing: ".14em", textTransform: "uppercase", color: "#15171c", background: "var(--g)", display: "inline-block", padding: "6px 12px", borderRadius: 7, marginBottom: 18 }}>
                  Most chosen
                </div>
              )}
              <div style={{ font: "500 15px/1 var(--f-ui)", color: "#cfd3d7", marginBottom: 14 }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ font: "400 46px/1 var(--f-display)", color: "var(--t-primary)" }}>{p.price}</span>
                <span style={{ font: "400 14px/1 var(--f-ui)", color: "#888e95" }}>{p.per}</span>
              </div>
              <div style={{ font: "400 13.5px/1.5 var(--f-ui)", color: "#888e95", marginBottom: 24, minHeight: 40 }}>{p.note}</div>
              <button
                onClick={invite}
                className="focusring"
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: 14,
                  borderRadius: 11,
                  font: "600 14px/1 var(--f-ui)",
                  cursor: "pointer",
                  border: p.featured ? "none" : "1px solid rgba(220,226,230,.18)",
                  background: p.featured ? "var(--g)" : "transparent",
                  color: p.featured ? "#15171c" : "var(--t-body)",
                }}
              >
                {p.cta}
              </button>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 24 }}>
                {p.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <span style={{ color: "var(--g)", fontSize: 13, flex: "none" }}>✓</span>
                    <span style={{ font: "400 13.5px/1.4 var(--f-ui)", color: "var(--t-secondary)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* final CTA */}
        <div className="lp-pad" style={{ margin: "70px 0 0" }}>
          <div className="lp-cta-inner" style={{ margin: "0 64px", borderRadius: 28, background: "linear-gradient(135deg,#20242c,#15171c)", border: "1px solid rgba(201,168,106,.2)", padding: "70px 40px", textAlign: "center" }}>
            <h2 className="lp-h2" style={{ fontSize: "clamp(32px,4vw,54px)" }}>
              Never scramble for a gift <i style={{ fontStyle: "italic", color: "var(--g)" }}>again</i>.
            </h2>
            <p style={{ margin: "22px auto 0", font: "400 17px/1.6 var(--f-ui)", color: "var(--t-muted)", maxWidth: "46ch" }}>
              Invitations open in small batches. Join the list and we'll reach out when a place opens.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 34 }}>
              <div style={{ display: "flex", alignItems: "center", padding: "6px 6px 6px 20px", borderRadius: 14, background: "#0f1115", border: "1px solid rgba(220,226,230,.14)", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                <span style={{ font: "400 15px/1 var(--f-ui)", color: "var(--t-faintest)", marginRight: 26 }}>you@email.com</span>
                <button onClick={invite} className="focusring" style={{ font: "600 14px/1 var(--f-ui)", color: "#15171c", background: "var(--g)", padding: "14px 26px", borderRadius: 10, border: "none", cursor: "pointer" }}>
                  Request an invite
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="lp-pad" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "44px 64px", marginTop: 60, borderTop: "1px solid rgba(220,226,230,.06)", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <Logo size={26} />
            <span style={{ font: "500 17px/1 var(--f-display)", color: "#cfd3d7" }}>Fondly</span>
          </div>
          <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
            {footerLinks.map((l) => (
              <span key={l} style={{ font: "400 13px/1 var(--f-ui)", color: "var(--t-faintest)", cursor: "pointer" }}>
                {l}
              </span>
            ))}
          </div>
          <span style={{ font: "400 12.5px/1 var(--f-ui)", color: "var(--t-dim)" }}>© 2026 Fondly</span>
        </div>
      </div>
    </div>
  );
}

function Logo({ size }: { size: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "1px solid var(--g)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--g)",
        font: `400 ${Math.round(size * 0.53)}px/1 var(--f-display)`,
      }}
    >
      f
    </span>
  );
}
