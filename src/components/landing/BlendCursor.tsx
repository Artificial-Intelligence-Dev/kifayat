import { useEffect, useRef, useState } from "react";

export function BlendCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.classList.add("has-blend-cursor");
    setActive(true);

    const move = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      const el = e.target as HTMLElement | null;
      const labelled = el?.closest<HTMLElement>("[data-cursor]");
      const next = labelled?.dataset.cursor ?? null;
      setLabel((prev) => (prev === next ? prev : next === "view" ? "View" : next));
    };

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;
      if (dot.current) dot.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf.current = requestAnimationFrame(loop);
    return () => {
      document.body.classList.remove("has-blend-cursor");
      window.removeEventListener("mousemove", move);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        style={{ mixBlendMode: "difference" }}
        className="fixed top-0 left-0 z-[200] pointer-events-none -ml-[3px] -mt-[3px] size-[6px] rounded-full bg-bone"
      />
      <div
        ref={ring}
        aria-hidden
        style={{ mixBlendMode: "difference" }}
        className={`fixed top-0 left-0 z-[200] pointer-events-none flex items-center justify-center rounded-full border border-bone/70 transition-[width,height,background,color] duration-300 ease-out ${
          label ? "-ml-[44px] -mt-[44px] size-[88px] bg-brass border-brass text-coal" : "-ml-[18px] -mt-[18px] size-9 bg-transparent text-bone"
        }`}
      >
        {label && <span className="eyebrow text-coal">{label}</span>}
      </div>
    </>
  );
}
