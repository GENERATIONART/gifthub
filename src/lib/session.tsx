import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, isLive } from "./supabase";

/* Auth/session context backed by Supabase magic-link. In seed mode (no backend
   configured) it's inert: `session` stays null and the app uses local data. */

type SessionContextValue = {
  session: Session | null;
  loading: boolean;
  /** Send a magic-link sign-in email. No-op (resolves) in seed mode. */
  signIn: (email: string) => Promise<{ error: string | null }>;
  /** Password sign-in (no email sent). No-op (resolves) in seed mode. */
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(isLive);

  useEffect(() => {
    const clientPromise = getSupabase();
    if (!clientPromise) return;
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    clientPromise.then((client) => {
      if (cancelled) return;
      client.auth.getSession().then(({ data }) => {
        if (!cancelled) {
          setSession(data.session);
          setLoading(false);
        }
      });
      const { data: sub } = client.auth.onAuthStateChange((_e, s) => !cancelled && setSession(s));
      unsubscribe = () => sub.subscription.unsubscribe();
    });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const signIn = useCallback(async (email: string) => {
    const client = await getSupabase();
    if (!client) return { error: null };
    const { error } = await client.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/app` },
    });
    return { error: error?.message ?? null };
  }, []);

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    const client = await getSupabase();
    if (!client) return { error: null };
    const { error } = await client.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    const client = await getSupabase();
    await client?.auth.signOut();
  }, []);

  const value = useMemo(
    () => ({ session, loading, signIn, signInWithPassword, signOut }),
    [session, loading, signIn, signInWithPassword, signOut],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within <SessionProvider>");
  return ctx;
}
