import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* Supabase client — only created when the project is configured via env.
   When absent, the app runs in "seed mode": every data call falls back to the
   local values in src/data/app.ts, so the design demo works with no backend. */

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

/** True when the frontend is pointed at a real backend + Supabase project. */
export const isLive = Boolean(url && anon && apiUrl);

export const supabase: SupabaseClient | null = isLive
  ? createClient(url!, anon!)
  : null;

export const API_URL = apiUrl ?? "";
