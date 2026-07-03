/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Fondly API base URL, e.g. http://localhost:8000/api */
  readonly VITE_API_URL?: string;
  /** Supabase project URL, e.g. https://xxxx.supabase.co */
  readonly VITE_SUPABASE_URL?: string;
  /** Supabase anon (publishable) key */
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
