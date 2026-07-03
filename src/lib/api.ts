import type {
  Alert,
  Axes,
  CalMonth,
  HomeMoment,
  InMotion,
  Notif,
  RefineGift,
} from "../data/app";
import { API_URL, getSupabase } from "./supabase";

/* Typed client for the Fondly API. Every call attaches the Supabase JWT.
   Screens should prefer these over importing seeded data from data/app.ts —
   the return shapes match those seeded types 1:1. */

async function authHeader(): Promise<Record<string, string>> {
  const client = await getSupabase();
  const token = (await client?.auth.getSession())?.data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText);
    throw new Error(`${res.status} ${path}: ${detail}`);
  }
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

/* AppShell, Home, Settings, and Empty each independently ask "who is the
   current user" on mount — same request every time. Cache the in-flight/
   resolved promise per path so simultaneous or repeat callers within a
   session share one round trip instead of firing one each. */
const getCache = new Map<string, Promise<unknown>>();
function cachedGet<T>(path: string): Promise<T> {
  let p = getCache.get(path) as Promise<T> | undefined;
  if (!p) {
    p = request<T>(path);
    p.catch(() => getCache.delete(path));
    getCache.set(path, p);
  }
  return p;
}

// ── Response shapes (mirror app.ts types) ───────────────────────────────────
export interface ScoredGift extends RefineGift {
  id: string;
  score: number;
}

export interface DiscoverParsedItem {
  k: string;
  v: string;
}
export interface DiscoverResult {
  parsed: DiscoverParsedItem[];
  results: ScoredGift[];
  live: boolean;
}
export interface PersonSummary {
  id: string;
  name: string;
  initial?: string | null;
  relation?: string | null;
  flagged?: boolean;
  av?: [string, string] | null;
  next?: string | null;
}
export interface PersonDetail extends PersonSummary {
  birthday?: string | null;
  anniversary?: string | null;
  taste_summary?: string | null;
  insight?: string | null;
  loves: string[];
  avoid: string[];
  circle: { name: string; initial?: string; note?: string; tag?: string; av?: [string, string] }[];
  history: { year?: string; gift: string; occasion?: string; price?: string }[];
}

export interface CircleSuggestion {
  name: string;
  tag?: string | null;
  note?: string | null;
}

export interface HomeMomentLive extends HomeMoment {
  person_id?: string;
  occasion_id?: string | null;
}
export interface InMotionLive extends InMotion {
  person_id?: string;
  occasion_id?: string | null;
}
export interface HomeData {
  needs_you: HomeMomentLive[];
  in_motion: InMotionLive[];
}
export interface Stat {
  value: string;
  label: string;
}
export interface MemorySummary {
  stats: Stat[];
  insights: string[];
}
export interface NotifFlat extends Notif {
  group_label?: string | null;
}
export interface AddressRow {
  name: string;
  line: string;
  initial?: string;
  verified: boolean;
  av?: [string, string] | null;
}
export interface LedgerRow {
  given_on?: string | null;
  who?: string | null;
  gift: string;
  occ?: string | null;
  price_cents?: number | null;
  react?: string | null;
}
export interface SettingsValues {
  auto_approve: boolean;
  auto_approve_cents: number;
  price_watch: boolean;
  card_sign: boolean;
  reroute: boolean;
}

// ── The gift flow: Studio pick → Approve/order → Tracking → Reaction ───────
export interface ProjectPerson {
  id: string;
  name: string;
  initial?: string | null;
  av?: [string, string] | null;
}
export interface ProjectGift {
  id: string;
  name: string;
  price: string;
  img?: string | null;
  why?: string | null;
}
export interface ProjectTrackStep {
  st: "done" | "active" | "future";
  title: string;
  detail?: string | null;
  when?: string | null;
}
export interface ProjectDetail {
  id: string;
  status: string;
  headline?: string | null;
  person: ProjectPerson;
  gift: ProjectGift | null;
  track: ProjectTrackStep[];
}

export interface CurrentUser {
  id: string;
  name: string;
  first_name?: string | null;
  initials?: string | null;
  plan: string;
  jewel: string;
}

// ── Endpoints ───────────────────────────────────────────────────────────────
export const api = {
  me: () => cachedGet<CurrentUser>("/me"),

  listPeople: () => request<PersonSummary[]>("/people"),
  getPerson: (id: string) => request<PersonDetail>(`/people/${id}`),
  createPerson: (body: {
    name: string;
    relation?: string;
    birthday?: string;
    anniversary?: string;
    loves?: string[];
    avoid?: string[];
  }) => request<PersonDetail>("/people", { method: "POST", body: JSON.stringify(body) }),
  updatePerson: (id: string, body: {
    name?: string;
    relation?: string;
    birthday?: string;
    anniversary?: string;
    loves?: string[];
    avoid?: string[];
  }) => request<PersonDetail>(`/people/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  reindexPerson: (id: string) => request<void>(`/people/${id}/reindex`, { method: "POST" }),
  suggestCircle: (personId: string) => request<CircleSuggestion[]>(`/people/${personId}/circle/suggest`, { method: "POST" }),
  addCircleMember: (personId: string, body: CircleSuggestion) =>
    request<{ name: string; initial?: string; note?: string; tag?: string; av?: [string, string] }>(
      `/people/${personId}/circle`,
      { method: "POST", body: JSON.stringify(body) },
    ),

  refine: (personId: string, dials: Axes, opts?: { limit?: number; offset?: number; rerank?: boolean }) =>
    request<ScoredGift[]>("/refine", {
      method: "POST",
      body: JSON.stringify({
        person_id: personId,
        dials,
        limit: opts?.limit ?? 7,
        offset: opts?.offset ?? 0,
        rerank: opts?.rerank ?? true,
      }),
    }),

  listGifts: () => request<RefineGift[]>("/gifts"),

  discover: (text: string, opts?: { limit?: number }) =>
    request<DiscoverResult>("/discover", {
      method: "POST",
      body: JSON.stringify({ text, limit: opts?.limit ?? 8 }),
    }),

  home: () => request<HomeData>("/home"),
  calendar: () => request<CalMonth[]>("/calendar"),

  ledger: () => request<LedgerRow[]>("/memory/ledger"),
  memorySummary: () => request<MemorySummary>("/memory/summary"),
  logReaction: (body: { person_id: string; reaction: string; project_id?: string; note?: string }) =>
    request<{ ok: boolean }>("/memory/reactions", { method: "POST", body: JSON.stringify(body) }),

  notifications: () => request<NotifFlat[]>("/notifications"),
  alerts: () => request<Alert[]>("/alerts"),

  settings: () => request<SettingsValues>("/me/settings"),
  addresses: () => request<AddressRow[]>("/me/addresses"),

  approveProject: (body: { person_id: string; gift_id: string; occasion_id?: string | null }) =>
    request<ProjectDetail>("/projects/approve", { method: "POST", body: JSON.stringify(body) }),
  getProject: (id: string) => request<ProjectDetail>(`/projects/${id}`),
};
