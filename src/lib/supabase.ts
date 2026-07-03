import type { SupabaseClient } from "@supabase/supabase-js";

/* Supabase client — only created when the project is configured via env.
   When absent, the app runs in "seed mode": every data call falls back to the
   local values in src/data/app.ts, so the design demo works with no backend. */

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

/** True when the frontend is pointed at a real backend + Supabase project. */
export const isLive = Boolean(url && anon && apiUrl);

export const API_URL = apiUrl ?? "";

let clientPromise: Promise<SupabaseClient> | null = null;

/** Lazily loads the Supabase SDK (a ~55kb-gzip chunk) only once something
    actually needs it — screens that just read `isLive` (most of them) never
    trigger this, so pages with no auth/live-data touch (Landing, Onboarding)
    don't pay for it on first paint. Returns null in seed mode. */
export function getSupabase(): Promise<SupabaseClient> | null {
  if (!isLive) return null;
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) => createClient(url!, anon!));
  }
  return clientPromise;
}
