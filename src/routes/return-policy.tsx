import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/landing/LegalPage";

export const Route = createFileRoute("/return-policy")({
  head: () => ({ meta: [{ title: "Return & Refund Policy — Kifayat" }] }),
  component: () => <LegalPage title="Return & Refund Policy" sections={[
    { heading: "7-day return window", body: "You may return most unused items in original packaging within 7 days of delivery for a full refund or exchange." },
    { heading: "How to start a return", body: "Open your order in My Account → Orders, select the item and choose 'Return'. Our courier will pick it up free of charge in Karachi." },
    { heading: "Refund timeline", body: "Once we receive and inspect the return, refunds are processed within 5–7 business days to the original payment method." },
    { heading: "Non-returnable items", body: "Intimate apparel, opened beauty products, perishables and personalised items can't be returned for hygiene reasons unless they arrived damaged." },
    { heading: "Damaged or wrong items", body: "If your order arrives damaged or incorrect, message us within 48 hours with photos and we'll arrange a free replacement." },
  ]} />,
});
