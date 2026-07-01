import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_JEWEL } from "./theme";

/* Themeable accent ("jewel"). Persisted so the user's choice themes every
   surface — mirrors the design tool's `jewel` prop. The value is written to
   the CSS custom property `--g`, which the whole app reads. */

const STORAGE_KEY = "fondly.jewel";

type ThemeContextValue = {
  jewel: string;
  setJewel: (hex: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [jewel, setJewelState] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_JEWEL;
    return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_JEWEL;
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--g", jewel);
  }, [jewel]);

  const setJewel = useCallback((hex: string) => {
    setJewelState(hex);
    try {
      window.localStorage.setItem(STORAGE_KEY, hex);
    } catch {
      /* ignore private-mode write failures */
    }
  }, []);

  const value = useMemo(() => ({ jewel, setJewel }), [jewel, setJewel]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
