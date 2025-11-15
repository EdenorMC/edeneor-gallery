import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

export const useTheme = () => {
  const mqdark = window.matchMedia("(prefers-color-scheme: dark)");
  const initialTheme: Theme = mqdark.matches ? "dark" : "light";
  const [theme, setTheme] = useState<Theme>(initialTheme);
  useEffect(() => {
    const darkThemeListener = (e: MediaQueryListEvent) =>
      e.matches && setTheme("dark");
    const lightThemeListener = (e: MediaQueryListEvent) =>
      e.matches && setTheme("light");
    const mdark = window.matchMedia("(prefers-color-scheme: dark)");
    const mlight = window.matchMedia("(prefers-color-scheme: light)");
    mdark.addEventListener("change", darkThemeListener);
    mlight.addEventListener("change", lightThemeListener);
    return () => {
      // cleanup event listeners
      mdark.removeEventListener("change", darkThemeListener);
      mlight.removeEventListener("change", lightThemeListener);
    };
  }, []);
  return theme;
};