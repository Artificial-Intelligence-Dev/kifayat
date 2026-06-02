import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let cleanup = () => {};
    let cancelled = false;
    let raf = 0;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        lerp: 0.095,
        smoothWheel: true,
        wheelMultiplier: 0.88,
        touchMultiplier: 1.1,
        syncTouch: false,
      });
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanup = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
  return null;
}
