import { useEffect, useState } from "react";
import { isLive } from "./supabase";

/* useLive — the wiring pattern for read-only screens.

   In seed mode (no backend configured) it returns `fallback` immediately and
   never fetches, so the design demo works offline. In live mode it fetches and
   returns the result once it arrives; on error it degrades back to `fallback`.

   Usage:
     const moments = useLive(() => api.home(), { needs_you: needsYou, ... });
*/
export function useLive<T>(fetcher: () => Promise<T>, fallback: T, deps: unknown[] = []): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    if (!isLive) return;
    let cancelled = false;
    fetcher()
      .then((r) => !cancelled && setData(r))
      .catch(() => !cancelled && setData(fallback));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return data;
}
