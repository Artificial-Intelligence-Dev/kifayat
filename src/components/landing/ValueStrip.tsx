const values = [
  { n: "01", t: "Curated, not crowded", d: "Every item earns its place. We&rsquo;d rather show you one perfect piece than fifty mediocre ones." },
  { n: "02", t: "Pakistan-wide dispatch", d: "Same-day across Karachi metro. 2–5 working days to every other city in the country." },
  { n: "03", t: "Honest pricing, always", d: "No inflated MRPs. No fake discounts. The price you see is the fairest one we could find." },
  { n: "04", t: "7-day no-questions returns", d: "Change of heart? Pick-up from your door, refund in 48 hours. Zero friction." },
];

export function ValueStrip() {
  return (
    <section className="bg-paper py-20 lg:py-28 border-y border-coal/8">
      <div className="max-w-[1600px] mx-auto px-5 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {values.map((v) => (
            <div key={v.n} className="border-t border-coal/15 pt-6">
              <p className="font-mono text-xs text-coal/40 mb-6">N° {v.n}</p>
              <h3 className="font-display italic text-3xl lg:text-4xl leading-tight mb-4">{v.t}</h3>
              <p className="text-coal/65 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: v.d }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
