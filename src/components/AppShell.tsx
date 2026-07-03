import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { navItems, currentUser as seedCurrentUser, type NavItem } from "../data/app";
import { Avatar } from "./ui";
import { AIPanel } from "./AIPanel";
import { api, type CurrentUser, type PersonSummary } from "../lib/api";
import { useLive } from "../lib/useLive";
import { isLive } from "../lib/supabase";
import { AddPersonModal } from "./AddPersonModal";

/* Responsive three-pane app shell.
   ≥1200px: nav · content · AI panel.
   <1200px: AI panel → slide-over drawer (toggled from top bar / FAB).
   <900px:  nav → off-canvas drawer; top bar + bottom tab bar appear.        */

function screenKeyFor(pathname: string): string {
  const p = pathname.replace(/\/$/, "");
  if (p === "/app" || p === "") return "home";
  if (p.startsWith("/app/profile")) return "profile";
  const seg = p.replace("/app/", "");
  const map: Record<string, string> = {
    calendar: "calendar",
    discover: "discover",
    studio: "studio",
    refine: "refine",
    approve: "approve",
    tracking: "tracking",
    reaction: "reaction",
    memory: "memory",
    "from-fondly": "notifs",
    alerts: "alerts",
    settings: "settings",
    empty: "empty",
  };
  return map[seg] ?? "home";
}

function isActive(item: NavItem, pathname: string): boolean {
  if (item.match) return item.match.some((m) => pathname === m || pathname.startsWith(m + "/"));
  return pathname === item.to || (item.to !== "/app" && pathname.startsWith(item.to + "/"));
}

const DEFAULT_AV: [string, string] = ["#2a2f37", "var(--g)"];

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [peopleVersion, setPeopleVersion] = useState(0);
  const people = useLive<PersonSummary[]>(() => api.listPeople(), [], [peopleVersion]);
  const currentUser = useLive<CurrentUser>(() => api.me(), {
    id: "", name: seedCurrentUser.name, first_name: seedCurrentUser.first,
    initials: seedCurrentUser.initials, plan: seedCurrentUser.plan, jewel: "",
  });
  const [addPersonOpen, setAddPersonOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  // Close drawers on navigation.
  useEffect(() => {
    setNavOpen(false);
    setPanelOpen(false);
    document.querySelector(".main")?.scrollTo(0, 0);
  }, [location.pathname]);

  // Escape closes any open drawer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNavOpen(false);
        setPanelOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Make off-canvas drawers inert (unfocusable) while collapsed & closed, so
  // keyboard/AT users don't tab into hidden panes. Rails on desktop stay active.
  useEffect(() => {
    const navDrawer = window.matchMedia("(max-width: 900px)");
    const panelDrawer = window.matchMedia("(max-width: 1200px)");
    const apply = () => {
      if (navRef.current) navRef.current.inert = navDrawer.matches && !navOpen;
      if (panelRef.current) panelRef.current.inert = panelDrawer.matches && !panelOpen;
    };
    apply();
    navDrawer.addEventListener("change", apply);
    panelDrawer.addEventListener("change", apply);
    return () => {
      navDrawer.removeEventListener("change", apply);
      panelDrawer.removeEventListener("change", apply);
    };
  }, [navOpen, panelOpen]);

  const screenKey = screenKeyFor(location.pathname);

  const navBody = (
    <>
      <Link to="/app" style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 22px" }}>
        <span
          style={{
            width: 30,
            height: 30,
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
        </span>
        <span style={{ font: "500 20px/1 var(--f-display)", color: "var(--t-primary)" }}>Fondly</span>
      </Link>

      <Link
        to="/app/discover"
        className="focusring"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          margin: "0 0 18px",
          padding: "11px 13px",
          borderRadius: 12,
          background: "var(--g)",
          color: "#15171c",
          font: "600 13px/1 var(--f-ui)",
        }}
      >
        <span style={{ fontSize: 15 }}>＋</span> New gift
      </Link>

      <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {navItems.map((n) => {
          const active = isActive(n, location.pathname);
          return (
            <Link
              key={n.key}
              to={n.to}
              className="focusring"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "10px 13px",
                borderRadius: 11,
                font: "500 13.5px/1 var(--f-ui)",
                transition: "all .15s",
                background: active ? "rgba(220,226,230,.07)" : "transparent",
                color: active ? "var(--t-primary)" : "var(--t-muted)",
              }}
            >
              <span style={{ fontSize: 15, width: 20, textAlign: "center", flex: "none" }}>{n.icon}</span>
              <span style={{ flex: 1 }}>{n.label}</span>
              {n.badge && (
                <span
                  style={{
                    font: "600 10px/1 var(--f-ui)",
                    background: "var(--g)",
                    color: "#15171c",
                    padding: "3px 7px",
                    borderRadius: 7,
                  }}
                >
                  {n.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 12px 12px",
        }}
      >
        <span
          style={{
            font: "600 9.5px/1 var(--f-ui)",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "var(--t-dim)",
          }}
        >
          Your people
        </span>
        {isLive && (
          <button
            onClick={() => setAddPersonOpen(true)}
            aria-label="Add someone to gift"
            className="focusring"
            style={{
              width: 20,
              height: 20,
              flex: "none",
              borderRadius: "50%",
              border: "1px solid rgba(220,226,230,.2)",
              background: "transparent",
              color: "var(--t-faint)",
              fontSize: 12,
              lineHeight: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ＋
          </button>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, overflowY: "auto", flex: 1, minHeight: 0 }}>
        {people.length === 0 && (
          <div style={{ padding: "9px 11px", font: "400 12px/1.4 var(--f-ui)", color: "var(--t-faintest)" }}>
            No one yet — add someone to get started.
          </div>
        )}
        {people.map((p) => {
          const active = location.pathname === `/app/profile/${p.id}`;
          const [bg, fg] = p.av ?? DEFAULT_AV;
          return (
            <Link
              key={p.id}
              to={`/app/profile/${p.id}`}
              className="focusring"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "9px 11px",
                borderRadius: 11,
                transition: "all .15s",
                background: active ? "rgba(220,226,230,.07)" : "transparent",
              }}
            >
              <Avatar initial={p.initial ?? p.name[0]} bg={bg} fg={fg} size={32} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    font: "500 13px/1.15 var(--f-ui)",
                    color: "var(--t-body)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.name}
                </div>
                <div style={{ font: "400 11px/1 var(--f-ui)", color: "var(--t-faintest)", marginTop: 3 }}>{p.next}</div>
              </div>
              {p.flagged && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--g)", flex: "none" }} />}
            </Link>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 10px 4px",
          marginTop: 8,
          borderTop: "var(--line-faint)",
        }}
      >
        <Avatar initial={currentUser.initials ?? currentUser.name[0]} bg="#2a2f37" fg="var(--t-secondary)" size={30} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: "500 12.5px/1 var(--f-ui)", color: "var(--t-body)" }}>{currentUser.name}</div>
          <div style={{ font: "400 10.5px/1 var(--f-ui)", color: "var(--t-faintest)", marginTop: 3 }}>{currentUser.plan}</div>
        </div>
        <Link
          to="/app/settings"
          aria-label="Settings"
          className="focusring"
          style={{
            color: location.pathname === "/app/settings" ? "var(--g)" : "var(--t-dim)",
            fontSize: 15,
          }}
        >
          ⚙
        </Link>
      </div>
    </>
  );

  return (
    <div className="shell">
      {/* mobile top bar */}
      <div className="topbar">
        <button
          onClick={() => setNavOpen(true)}
          aria-label="Open menu"
          className="focusring hit"
          style={{ background: "transparent", border: "none", color: "var(--t-body)", fontSize: 20, cursor: "pointer" }}
        >
          ☰
        </button>
        <Link to="/app" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              border: "1px solid var(--g)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--g)",
              font: "400 13px/1 var(--f-display)",
            }}
          >
            f
          </span>
          <span style={{ font: "500 17px/1 var(--f-display)", color: "var(--t-primary)" }}>Fondly</span>
        </Link>
        <button
          onClick={() => setPanelOpen(true)}
          aria-label="Open assistant"
          className="focusring hit"
          style={{
            background: "transparent",
            border: "1px solid var(--g)",
            color: "var(--g)",
            borderRadius: "50%",
            width: 34,
            height: 34,
            cursor: "pointer",
            font: "400 15px/1 var(--f-display)",
          }}
        >
          f
        </button>
      </div>

      {/* left nav (rail on desktop, drawer on mobile) */}
      <aside ref={navRef} className={"nav" + (navOpen ? " open" : "")} aria-label="Primary navigation">
        {navBody}
      </aside>

      {/* center content */}
      <main className="main">
        <Outlet />
      </main>

      {/* right AI panel (rail on desktop ≥1200, drawer below) */}
      <aside ref={panelRef} className={"panel" + (panelOpen ? " open" : "")} aria-label="Fondly assistant">
        <AIPanel screenKey={screenKey} onClose={() => setPanelOpen(false)} />
      </aside>

      {/* backdrop for whichever drawer is open (mobile) */}
      {(navOpen || panelOpen) && (
        <div
          className="backdrop"
          onClick={() => {
            setNavOpen(false);
            setPanelOpen(false);
          }}
        />
      )}

      {addPersonOpen && (
        <AddPersonModal
          onClose={() => setAddPersonOpen(false)}
          onCreated={(person) => {
            setAddPersonOpen(false);
            setPeopleVersion((v) => v + 1);
            navigate(`/app/profile/${person.id}`);
          }}
        />
      )}

      {/* assistant FAB — only in the 901–1200px band, where the panel is a
          drawer but the mobile top bar (with its assistant button) is hidden. */}
      <button
        onClick={() => setPanelOpen(true)}
        aria-label="Open assistant"
        className="focusring assistant-fab"
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 38,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "var(--g)",
          color: "#15171c",
          border: "none",
          cursor: "pointer",
          font: "400 24px/1 var(--f-display)",
          boxShadow: "0 12px 30px rgba(0,0,0,.45)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        f
      </button>

      {/* mobile bottom tab bar — 5 distinct primary destinations */}
      <nav className="bottomtabs">
        {(["home", "calendar", "discover", "studio", "notifs"] as const).map((key) => {
          const n = navItems.find((i) => i.key === key)!;
          const shortLabel: Record<string, string> = { home: "Upcoming", calendar: "Calendar", discover: "Discover", studio: "Studio", notifs: "Updates" };
          const active = isActive(n, location.pathname);
          return (
            <button
              key={n.key}
              onClick={() => navigate(n.to)}
              className="focusring"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                cursor: "pointer",
                color: active ? "var(--g)" : "var(--t-dim)",
              }}
            >
              <span style={{ fontSize: 18, position: "relative" }}>
                {n.icon}
                {n.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -8,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--g)",
                    }}
                  />
                )}
              </span>
              <span style={{ font: "600 8.5px/1 var(--f-ui)", letterSpacing: ".04em", textTransform: "uppercase" }}>
                {shortLabel[n.key]}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
