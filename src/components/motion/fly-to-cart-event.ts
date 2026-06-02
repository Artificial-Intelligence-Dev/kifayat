export function flyToCart(src: string, fromEl: HTMLElement) {
  if (typeof window === "undefined") return;
  const cart = document.querySelector<HTMLElement>("[data-cart-icon]");
  if (!cart) return;
  const a = fromEl.getBoundingClientRect();
  const b = cart.getBoundingClientRect();
  window.dispatchEvent(
    new CustomEvent("kfy:fly", {
      detail: {
        src,
        from: { x: a.left, y: a.top, w: a.width, h: a.height },
        to: { x: b.left + b.width / 2, y: b.top + b.height / 2 },
      },
    }),
  );
}