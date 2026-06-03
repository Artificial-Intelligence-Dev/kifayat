export function Newsletter() {
  return (
    <section className="bg-bone py-28 lg:py-40 px-5 lg:px-10">
      <div className="max-w-2xl mx-auto text-center">
        <p className="eyebrow text-coal/50 mb-6">N° 04 · Subscribe</p>
        <h2 className="font-display italic text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
          The Kifayat List.
        </h2>
        <p className="mt-8 max-w-md mx-auto text-coal/60 text-sm lg:text-base leading-relaxed">
          A weekly briefing on style, tech and everyday essentials — plus first access to drops, dispatched Pakistan-wide before they go public.
        </p>

        <form className="mt-14 max-w-lg mx-auto relative">
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            className="w-full bg-transparent border-b border-coal/60 py-4 pr-28 eyebrow tracking-[0.2em] focus:outline-none focus:border-coal placeholder:text-coal/30"
          />
          <button
            type="submit"
            className="absolute right-0 bottom-3 eyebrow font-bold border-b border-coal pb-0.5 hover:opacity-60 transition"
          >
            Join →
          </button>
        </form>

        <p className="mt-8 eyebrow text-coal/30">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
