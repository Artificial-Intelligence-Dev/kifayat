import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { MobileNav } from "@/components/landing/MobileNav";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileNav />
    </div>
  );
}

export function PageHeader({ title, subtitle, breadcrumbs }: { title: string; subtitle?: string; breadcrumbs?: { label: string; to?: string }[] }) {
  return (
    <section className="bg-secondary/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {breadcrumbs && (
          <nav className="text-xs text-muted-foreground mb-3 flex gap-1.5 flex-wrap">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {b.to ? <a href={b.to} className="hover:text-primary">{b.label}</a> : <span>{b.label}</span>}
                {i < breadcrumbs.length - 1 && <span>/</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl lg:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-muted-foreground max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
