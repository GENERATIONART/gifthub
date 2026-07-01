import { useEffect, useState } from "react";
import { panels, type PanelData } from "../data/app";

/* The right-hand AI panel — context-aware per screen. Shows a live "working"
   line that cycles, an activity timeline, and the sources it's drawing on.
   Supplementary by design (never load-bearing). */

export function AIPanel({ screenKey, onClose }: { screenKey: string; onClose?: () => void }) {
  const data: PanelData = panels[screenKey] ?? panels.home;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setTick((t) => t + 1), 2600);
    return () => clearInterval(iv);
  }, []);

  const currentAction = data.actions[tick % data.actions.length];
  const workingCount = data.items.filter((i) => i.st === "work").length;

  return (
    <>
      {/* header */}
      <div style={{ padding: "20px 22px 16px", borderBottom: "var(--line-faint)", flex: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div
            style={{
              position: "relative",
              width: 34,
              height: 34,
              flex: "none",
              borderRadius: "50%",
              border: "1px solid var(--g)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--g)",
              font: "400 16px/1 var(--f-display)",
            }}
          >
            f
            <span
              style={{
                position: "absolute",
                bottom: -1,
                right: -1,
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: "#3ddc84",
                border: "2px solid var(--bg-bar)",
                animation: "pulse 1.8s ease-in-out infinite",
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: "600 14px/1 var(--f-ui)", color: "var(--t-primary)" }}>Fondly</div>
            <div style={{ font: "400 11px/1 var(--f-ui)", color: "#3ddc84", marginTop: 4 }}>
              Working · {workingCount} {workingCount === 1 ? "task" : "tasks"} in motion
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close assistant"
              className="focusring hit panel-close"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--t-faint)",
                fontSize: 20,
                cursor: "pointer",
                borderRadius: 8,
              }}
            >
              ✕
            </button>
          )}
        </div>
        <div
          style={{
            marginTop: 14,
            padding: "12px 14px",
            borderRadius: 12,
            background: "rgba(201,168,106,.08)",
            border: "1px solid rgba(201,168,106,.2)",
          }}
        >
          <div
            style={{
              font: "500 13px/1.5 var(--f-ui)",
              color: "var(--t-body)",
              display: "flex",
              gap: 9,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                width: 13,
                height: 13,
                flex: "none",
                marginTop: 3,
                borderRadius: "50%",
                border: "2px solid var(--g)",
                borderTopColor: "transparent",
                animation: "spin .9s linear infinite",
              }}
            />
            <span>{currentAction}</span>
          </div>
        </div>
      </div>

      {/* activity */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "18px 22px" }}>
        <div
          style={{
            font: "600 9.5px/1 var(--f-ui)",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "var(--t-dim)",
            marginBottom: 14,
          }}
        >
          What I'm doing for this
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {data.items.map((it, i) => {
            const done = it.st === "done";
            return (
              <div key={i} style={{ display: "flex", gap: 12, paddingBottom: 18, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      flex: "none",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      font: "700 9px/1 var(--f-ui)",
                      ...(done
                        ? { background: "rgba(110,174,142,.18)", color: "#7fc3a0" }
                        : { background: "transparent", border: "1.5px solid var(--g)", color: "var(--g)" }),
                    }}
                  >
                    {done ? "✓" : ""}
                  </span>
                  {i < data.items.length - 1 && (
                    <span style={{ width: 1.5, flex: 1, minHeight: 14, background: "rgba(220,226,230,.1)", margin: "3px 0" }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "500 13px/1.45 var(--f-ui)", color: done ? "var(--t-secondary)" : "var(--t-primary)" }}>
                    {it.text}
                  </div>
                  {it.meta && (
                    <div style={{ font: "400 11px/1.4 var(--f-ui)", color: "var(--t-faintest)", marginTop: 4 }}>{it.meta}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            font: "600 9.5px/1 var(--f-ui)",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "var(--t-dim)",
            margin: "8px 0 12px",
          }}
        >
          Drawing on
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {data.sources.map((s) => (
            <span
              key={s}
              style={{
                font: "500 11px/1 var(--f-ui)",
                padding: "7px 11px",
                borderRadius: 8,
                background: "var(--bg-card)",
                color: "var(--t-muted)",
                border: "var(--line)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* composer */}
      <div style={{ flex: "none", padding: "14px 18px 18px", borderTop: "var(--line-faint)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 14px",
            borderRadius: 13,
            background: "var(--bg-card)",
            border: "var(--line)",
          }}
        >
          <span style={{ flex: 1, font: "400 13px/1.3 var(--f-ui)", color: "var(--t-faintest)" }}>
            Ask me anything, or steer…
          </span>
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "var(--g)",
              color: "#15171c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              flex: "none",
            }}
          >
            ↑
          </span>
        </div>
      </div>
    </>
  );
}
