import { useState } from "react";
import { Eyebrow, ImgWell } from "../../components/ui";
import { api, type DiscoverParsedItem, type ScoredGift } from "../../lib/api";
import { isLive } from "../../lib/supabase";

const PLACEHOLDER =
  "Retirement gift for my coworker Dave — he's into fly-fishing and good bourbon, 30 years at the firm. Around $80.";

export function Discover() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsed, setParsed] = useState<DiscoverParsedItem[] | null>(null);
  const [results, setResults] = useState<ScoredGift[] | null>(null);
  const [live, setLive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shown, setShown] = useState(8);

  const submit = () => {
    if (!text.trim() || loading || !isLive) return;
    setLoading(true);
    setError(null);
    setShown(8);
    api
      .discover(text.trim(), { limit: 24 })
      .then((r) => {
        setParsed(r.parsed);
        setResults(r.results);
        setLive(r.live);
      })
      .catch(() => setError("Couldn't find anything — try rephrasing."))
      .finally(() => setLoading(false));
  };

  const showingLive = parsed !== null && results !== null;
  const parsedItems: DiscoverParsedItem[] = showingLive ? parsed! : [];
  const top = showingLive ? results![0] : undefined;
  const rest: ScoredGift[] = showingLive ? results!.slice(1, shown) : [];
  const canShowMore = showingLive && results!.length > shown;

  return (
    <div className="screen screen-narrow">
      <h1 className="hero" style={{ margin: "0 0 18px" }}>
        Tell me who it's for. I'll find <i>it</i>.
      </h1>

      {/* composer */}
      <div style={{ borderRadius: 18, background: "var(--bg-card)", border: "var(--line)", padding: 20 }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
          }}
          placeholder={PLACEHOLDER}
          rows={3}
          className="focusring"
          style={{
            width: "100%",
            resize: "none",
            background: "transparent",
            border: "none",
            outline: "none",
            font: "400 16px/1.6 var(--f-ui)",
            color: "var(--t-body)",
          }}
        />
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
          <button
            onClick={submit}
            disabled={!text.trim() || loading || !isLive}
            aria-label="Find gifts"
            className="focusring"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: text.trim() && isLive ? "var(--g)" : "var(--surface-raised)",
              color: text.trim() && isLive ? "#15171c" : "var(--t-dim)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              flex: "none",
              cursor: text.trim() && isLive ? "pointer" : "default",
            }}
          >
            {loading ? "…" : "↑"}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ marginTop: 14, font: "400 13px/1.4 var(--f-ui)", color: "#d99a9a" }}>{error}</div>
      )}

      {!showingLive && !loading && (
        <p style={{ marginTop: 20, font: "400 13.5px/1.5 var(--f-ui)", color: "var(--t-faint)" }}>
          Describe who it's for and I'll find something — try the example above, or write your own.
        </p>
      )}

      {showingLive && (
        <>
      {/* parsed */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "20px 0 22px", flexWrap: "wrap" }}>
        <div style={{ font: "600 9.5px/1 var(--f-ui)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--g)" }}>
          Here's what I understood
        </div>
        <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 7, minWidth: 200 }}>
          {parsedItems.map((p) => (
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
        <span style={{ font: "400 11px/1 var(--f-ui)", color: "var(--t-faintest)" }}>
          {`${results!.length} found${live ? " · found live" : ""}`}
        </span>
      </div>

      {!top && (
        <p style={{ font: "400 13.5px/1.5 var(--f-ui)", color: "var(--t-faint)" }}>Nothing matched — try rephrasing.</p>
      )}

      {top && (
      <div className="discover-grid">
          <div
            key={top.id}
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
            <ImgWell label={top.img ?? ""} height={180}>
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
                <span style={{ font: "500 18px/1.2 var(--f-display)", color: "var(--t-primary)" }}>{top.name}</span>
                <span style={{ font: "500 15px/1 var(--f-display)", color: "#cfd3d7" }}>{top.price}</span>
              </div>
              <p style={{ margin: "10px 0 0", font: "400 13px/1.55 var(--f-ui)", color: "var(--t-muted)" }}>{top.why}</p>
            </div>
          </div>
        {rest.map((g) => (
          <div key={g.id} style={{ borderRadius: 15, overflow: "hidden", background: "var(--bg-card)", border: "var(--line)" }}>
            <ImgWell label={g.img ?? ""} height={84} style={{ font: "500 6.5px/1.3 var(--f-mono)" }} />
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
      )}

      {canShowMore && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 22 }}>
          <button
            onClick={() => setShown((n) => n + 8)}
            className="focusring"
            style={{
              font: "600 12.5px/1 var(--f-ui)",
              color: "var(--t-primary)",
              background: "transparent",
              border: "1px solid var(--g)",
              padding: "12px 24px",
              borderRadius: 999,
              cursor: "pointer",
            }}
          >
            Show more
          </button>
        </div>
      )}
        </>
      )}
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
