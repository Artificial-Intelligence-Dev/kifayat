import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Kifayat" },
    { name: "description", content: "Get in touch with the Kifayat team in Karachi — we usually reply within an hour." },
  ] }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <PageHeader title="Get in touch" subtitle="We usually reply within an hour during business hours."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]} />

      <section className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-[1fr_360px] gap-10">
        <form className="bg-card border border-border rounded-2xl p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-4">
            <label><span className="block text-sm font-medium mb-1.5">Name</span>
              <input required className="w-full h-11 px-3.5 rounded-md border border-border outline-none focus:border-primary text-sm" />
            </label>
            <label><span className="block text-sm font-medium mb-1.5">Email</span>
              <input type="email" required className="w-full h-11 px-3.5 rounded-md border border-border outline-none focus:border-primary text-sm" />
            </label>
          </div>
          <label className="block"><span className="block text-sm font-medium mb-1.5">Subject</span>
            <input className="w-full h-11 px-3.5 rounded-md border border-border outline-none focus:border-primary text-sm" />
          </label>
          <label className="block"><span className="block text-sm font-medium mb-1.5">Message</span>
            <textarea rows={5} required className="w-full px-3.5 py-3 rounded-md border border-border outline-none focus:border-primary text-sm" />
          </label>
          <button className="h-12 px-7 rounded-pill bg-primary text-primary-foreground font-semibold hover:bg-primary-dark transition">Send message</button>
        </form>

        <aside className="space-y-4">
          {[
            { Icon: Mail, title: "Email", text: "hello@kifayat.co" },
            { Icon: Phone, title: "Phone", text: "+92 21 1234 5678" },
            { Icon: MessageCircle, title: "WhatsApp", text: "+92 300 1234567" },
            { Icon: MapPin, title: "Office", text: "Plot 22, Korangi Industrial Area, Karachi 74900" },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-5 flex gap-4">
              <div className="size-10 rounded-xl bg-primary-soft grid place-items-center shrink-0"><Icon className="size-4 text-primary-dark" /></div>
              <div><div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div><div className="text-sm mt-0.5">{text}</div></div>
            </div>
          ))}
        </aside>
      </section>
    </PageShell>
  );
}
