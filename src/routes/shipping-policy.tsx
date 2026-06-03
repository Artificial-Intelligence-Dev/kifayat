import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/landing/LegalPage";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({ meta: [{ title: "Shipping Policy — Kifayat" }] }),
  component: () => <LegalPage title="Shipping Policy" sections={[
    { heading: "Coverage", body: "We dispatch Pakistan-wide. Same-day & next-day windows in Karachi metro; 2–5 working days to all other cities." },
    { heading: "Delivery times", body: "Standard delivery arrives in 2–4 business days. Express delivery is next-day for orders placed before 2 PM." },
    { heading: "Fees", body: "Standard delivery is free on orders above Rs 2,500, otherwise Rs 200. Express delivery is Rs 350 flat." },
    { heading: "Tracking", body: "You'll receive an SMS and email when your order ships, with a tracking link visible in My Account → Orders." },
    { heading: "Failed deliveries", body: "If the courier is unable to reach you after two attempts, the package is returned and a refund is issued (minus shipping)." },
  ]} />,
});
