import { PageShell, PageHeader } from "@/components/landing/PageShell";

export function LegalPage({ title, sections }: { title: string; sections: { heading: string; body: string }[] }) {
  return (
    <PageShell>
      <PageHeader title={title} breadcrumbs={[{ label: "Home", to: "/" }, { label: title }]} />
      <article className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display font-semibold text-xl mb-2">{s.heading}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
        <p className="text-xs text-muted-foreground border-t border-border pt-6">Last updated: May 2026</p>
      </article>
    </PageShell>
  );
}
