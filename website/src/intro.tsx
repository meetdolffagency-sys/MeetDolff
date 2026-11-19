import { createContext, useContext } from "react";

/** True once the page is visible to the visitor (after the optional intro lifts). */
export const IntroContext = createContext<boolean>(true);
export const useIntroDone = () => useContext(IntroContext);

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}
