import { useEffect, useState } from "react";

const KEY = "theme";

export const getTheme = () =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

const announce = (busy) =>
  window.dispatchEvent(new CustomEvent("themetransition", { detail: busy }));

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage can be unavailable */
  }
  window.dispatchEvent(new Event("themechange"));
};

// Switches theme; when an origin is given, the new theme spreads out from it as a circle
export const setTheme = (theme, origin) => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!origin || reduced || !document.startViewTransition) {
    applyTheme(theme);
    return;
  }

  const { x, y } = origin;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // Heavy canvases pause while the reveal runs so it gets the whole frame budget
  announce(true);
  // The callback must be synchronous: frames are paused until it returns
  const transition = document.startViewTransition(() => applyTheme(theme));
  transition.finished.finally(() => announce(false));

  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 650, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" }
    );
  });
};

// Re-renders when the theme changes so canvas components can restyle
export const useTheme = () => {
  const [theme, setThemeState] = useState(getTheme);

  useEffect(() => {
    const sync = () => setThemeState(getTheme());
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  return theme;
};

// True while the theme reveal animation is running
export const useThemeTransitioning = () => {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const sync = (e) => setBusy(e.detail);
    window.addEventListener("themetransition", sync);
    return () => window.removeEventListener("themetransition", sync);
  }, []);

  return busy;
};
