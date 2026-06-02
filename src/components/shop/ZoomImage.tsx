import { useRef, type PointerEvent } from "react";

export function ZoomImage({
  src,
  alt,
  className = "",
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const frame = useRef<number | null>(null);

  const updateOrigin = (e: PointerEvent<HTMLDivElement>) => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const target = e.currentTarget;
      const img = imgRef.current;
      if (!img) return;
      const r = target.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
    });
  };

  return (
    <div
      className={`relative overflow-hidden cursor-zoom-in ${className}`}
      onPointerMove={updateOrigin}
      onClick={onClick}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-500 ease-out hover:scale-[1.45] motion-reduce:transition-none motion-reduce:hover:scale-100"
      />
    </div>
  );
}