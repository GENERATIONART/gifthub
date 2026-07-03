import { Avatar, Eyebrow } from "../../components/ui";
import { api, type LedgerRow, type MemorySummary } from "../../lib/api";
import { useLive } from "../../lib/useLive";

interface LedgerYear {
  year: string;
  items: {
    date: string;
    who: string;
    gift: string;
    occ: string;
    price: string;
    react: "loved" | "liked";
  }[];
}

// No hardcoded per-person palette — real people's names aren't known ahead of
// time, so derive a stable color from the name itself instead.
const _AVATAR_PALETTE: [string, string][] = [
  ["#2a2f37", "var(--g)"],
  ["#2e2a37", "#b79cf0"],
  ["#26312b", "#7fc3a0"],
  ["#262d35", "#8ba6c4"],
  ["#37302a", "#d6a98a"],
];
function avatarFor(name: string): [string, [string, string]] {
  if (!name) return ["·", _AVATAR_PALETTE[0]];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return [name[0].toUpperCase(), _AVATAR_PALETTE[Math.abs(hash) % _AVATAR_PALETTE.length]];
}

/** Fold the flat gift-history feed into the year-grouped ledger shape. */
function groupLedger(rows: LedgerRow[]): LedgerYear[] {
  const order: string[] = [];
  const map = new Map<string, LedgerYear["items"]>();
  for (const r of rows) {
    const d = r.given_on ? new Date(r.given_on) : null;
    const year = d ? String(d.getFullYear()) : "—";
    if (!map.has(year)) {
      map.set(year, []);
      order.push(year);
    }
    map.get(year)!.push({
      date: d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "",
      who: r.who ?? "",
      gift: r.gift,
      occ: r.occ ?? "",
      price: r.price_cents != null ? `$${(r.price_cents / 100).toLocaleString()}` : "",
      react: (r.react ?? "liked") as "loved" | "liked",
    });
  }
  return order.map((year) => ({ year, items: map.get(year)! }));
}

export function Memory() {
  const summary = useLive<MemorySummary>(() => api.memorySummary(), { stats: [], insights: [] });
  const years = useLive<LedgerYear[]>(() => api.ledger().then(groupLedger), []);
  return (
    <div className="screen">
      <div className="eyebrow-accent">Gift memory</div>
      <h1 className="hero" style={{ margin: "14px 0 8px" }}>
        Everything you've <i>given</i>.
      </h1>
      <p className="lede">
        So I never repeat a gift, and can always say “last year you sent…”. Every gift you've approved
        lives here.
      </p>

      <div style={{ display: "flex", gap: 12, margin: "26px 0 32px", flexWrap: "wrap" }}>
        {summary.stats.map((s) => (
          <div key={s.label} style={{ flex: 1, minWidth: 140, padding: "18px 20px", borderRadius: 16, background: "var(--bg-card)", border: "var(--line-subtle)" }}>
            <div style={{ font: "400 30px/1 var(--f-display)", color: "var(--t-primary)" }}>{s.value}</div>
            <div style={{ font: "500 10.5px/1.3 var(--f-ui)", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--t-faint)", marginTop: 8 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {years.length === 0 && (
        <p style={{ font: "400 13.5px/1.5 var(--f-ui)", color: "var(--t-faint)" }}>
          Nothing given yet — every gift you approve will show up here, so I never repeat myself.
        </p>
      )}

      <div className="split" style={{ gridTemplateColumns: "1.4fr .6fr" }}>
        <div>
          {years.map((yr) => (
            <div key={yr.year} style={{ marginBottom: 26 }}>
              <div style={{ font: "400 15px/1 var(--f-display)", color: "var(--g)", marginBottom: 8 }}>{yr.year}</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {yr.items.map((it, i) => {
                  const [initial, av] = avatarFor(it.who);
                  const loved = it.react === "loved";
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 2px", borderBottom: "var(--line-faint)" }}>
                      <Avatar initial={initial} bg={av[0]} fg={av[1]} size={36} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ font: "500 14px/1.15 var(--f-ui)", color: "var(--t-body)" }}>{it.gift}</div>
                        <div style={{ font: "400 11.5px/1.3 var(--f-ui)", color: "#888e95", marginTop: 3 }}>
                          {it.who} · {it.occ} · {it.date}
                        </div>
                      </div>
                      <span
                        style={{
                          font: "600 9px/1 var(--f-ui)",
                          letterSpacing: ".06em",
                          textTransform: "uppercase",
                          padding: "5px 9px",
                          borderRadius: 7,
                          flex: "none",
                          ...(loved ? { background: "rgba(201,168,106,.16)", color: "var(--g)" } : { background: "rgba(220,226,230,.07)", color: "#888e95" }),
                        }}
                      >
                        {it.react}
                      </span>
                      <span style={{ font: "400 13px/1 var(--f-display)", color: "#cfd3d7", flex: "none", width: 54, textAlign: "right" }}>{it.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div>
          <Eyebrow style={{ marginBottom: 14 }}>What I've learned</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {summary.insights.map((t, i) => (
              <div key={i} style={{ padding: "16px 17px", borderRadius: 14, border: "1px dashed rgba(220,226,230,.14)", display: "flex", gap: 11, alignItems: "flex-start" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--g)", flex: "none", marginTop: 6 }} />
                <span style={{ font: "500 13px/1.5 var(--f-display)", fontStyle: "italic", color: "var(--t-muted)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
