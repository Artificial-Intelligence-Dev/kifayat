import { Star, Quote } from "lucide-react";

const items = [
  { name: "Ayesha K.", area: "Clifton, Karachi", text: "Delivery was fast and the product packaging felt premium. My new go-to for online shopping in Karachi.", rating: 5 },
  { name: "Bilal R.", area: "DHA Phase 6", text: "Honest prices and the return process was painless. Customer support actually replied within minutes.", rating: 5 },
  { name: "Saima A.", area: "Gulshan-e-Iqbal", text: "Loved the curated beauty section. Got exactly what I ordered, nothing like the usual marketplace surprises.", rating: 5 },
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Loved across the city</span>
          <h2 className="text-3xl lg:text-4xl mt-2">What shoppers say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <figure key={t.name} className="relative bg-card rounded-2xl p-6 border-l-4 border-primary shadow-[var(--shadow-e1)]">
              <Quote className="size-6 text-primary-soft absolute top-5 right-5" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-warning text-warning" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed">{t.text}</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-semibold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.area}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
