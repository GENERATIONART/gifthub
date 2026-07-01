import { Eyebrow, ImgWell } from "../../components/ui";
import { discoverParsed, discoverGifts } from "../../data/app";

export function Discover() {
  return (
    <div className="screen screen-narrow">
      <h1 className="hero" style={{ margin: "0 0 18px" }}>
        Tell me who it's for. I'll find <i>it</i>.
      </h1>

      {/* composer */}
      <div style={{ borderRadius: 18, background: "var(--bg-card)", border: "var(--line)", padding: 20 }}>
        <div style={{ font: "400 16px/1.6 var(--f-ui)", color: "var(--t-body)" }}>
          Retirement gift for my coworker <b style={{ color: "var(--t-primary)", fontWeight: 500 }}>Dave</b> — he's into{" "}
          <b style={{ color: "var(--t-primary)", fontWeight: 500 }}>fly-fishing</b> and good{" "}
          <b style={{ color: "var(--t-primary)", fontWeight: 500 }}>bourbon</b>, 30 years at the firm. Around{" "}
          <b style={{ color: "var(--t-primary)", fontWeight: 500 }}>$80</b>.
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 18,
              background: "var(--g)",
              marginLeft: 3,
              verticalAlign: -3,
              animation: "blink 1.1s step-end infinite",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 16,
            paddingTop: 15,
            borderTop: "var(--line-subtle)",
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={pill}>📎 Add a photo</span>
            <span style={pill}>🎤 Voice</span>
          </div>
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "var(--g)",
              color: "#15171c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              flex: "none",
            }}
          >
            ↑
          </span>
        </div>
      </div>

      {/* parsed */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "20px 0 22px", flexWrap: "wrap" }}>
        <div style={{ font: "600 9.5px/1 var(--f-ui)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--g)" }}>
          Here's what I understood
        </div>
        <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 7, minWidth: 200 }}>
          {discoverParsed.map((p) => (
            <span
              key={p.k}
              style={{
                font: "500 11.5px/1 var(--f-ui)",
                padding: "7px 12px",
                borderRadius: 999,
                background: "rgba(220,226,230,.07)",
                color: "#cfd3d7",
                border: "var(--line)",
              }}
            >
              <span style={{ color: "var(--t-faint)" }}>{p.k}</span>&nbsp;&nbsp;{p.v}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
        <Eyebrow>What I'd send</Eyebrow>
        <span style={{ font: "400 11px/1 var(--f-ui)", color: "var(--t-faintest)" }}>5 found · all under $90</span>
      </div>

      <div className="discover-grid">
        <div
          style={{
            gridColumn: "span 1",
            gridRow: "span 2",
            borderRadius: 18,
            overflow: "hidden",
            background: "var(--bg-card)",
            border: "1px solid var(--g)",
            boxShadow: "0 0 0 1px rgba(201,168,106,.18)",
          }}
        >
          <ImgWell label="[ ENGRAVED FLASK & FLY SET ]" height={180}>
            <span
              style={{
                position: "absolute",
                top: 13,
                left: 13,
                font: "600 9px/1 var(--f-ui)",
                letterSpacing: ".14em",
                color: "#15171c",
                background: "var(--g)",
                padding: "6px 10px",
                borderRadius: 999,
              }}
            >
              ◆ BEST FIT
            </span>
          </ImgWell>
          <div style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
              <span style={{ font: "500 18px/1.2 var(--f-display)", color: "var(--t-primary)" }}>Engraved flask & fly set</span>
              <span style={{ font: "500 15px/1 var(--f-display)", color: "#cfd3d7" }}>$78</span>
            </div>
            <p style={{ margin: "10px 0 0", font: "400 13px/1.55 var(--f-ui)", color: "var(--t-muted)" }}>
              Hits both his loves in one object, and the engraving plate turns a generic gift into "30 years, from the
              team."
            </p>
          </div>
        </div>
        {discoverGifts.map((g) => (
          <div key={g.name} style={{ borderRadius: 15, overflow: "hidden", background: "var(--bg-card)", border: "var(--line)" }}>
            <ImgWell label={g.img} height={84} style={{ font: "500 6.5px/1.3 var(--f-mono)" }} />
            <div style={{ padding: 13 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 6 }}>
                <span style={{ font: "500 13px/1.1 var(--f-display)", color: "var(--t-primary)" }}>{g.name}</span>
                <span style={{ font: "500 11px/1 var(--f-display)", color: "#cfd3d7", flex: "none" }}>{g.price}</span>
              </div>
              <p style={{ margin: "6px 0 0", font: "400 11px/1.45 var(--f-ui)", color: "#888e95" }}>{g.why}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const pill: React.CSSProperties = {
  font: "500 11.5px/1 var(--f-ui)",
  color: "var(--t-faint)",
  padding: "8px 13px",
  borderRadius: 999,
  border: "var(--line)",
};
