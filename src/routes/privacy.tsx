import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/landing/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Kifayat" }] }),
  component: () => <LegalPage title="Privacy Policy" sections={[
    { heading: "What we collect", body: "We collect the information you provide when creating an account, placing an order or contacting support — name, email, phone, delivery address and payment details." },
    { heading: "How we use it", body: "Your data is used to fulfil orders, provide support, prevent fraud and improve our service. We never sell your data to third parties." },
    { heading: "Cookies", body: "We use cookies to remember your cart, login session and basic analytics. You can disable cookies in your browser settings." },
    { heading: "Third-party services", body: "Payment processing and delivery are handled by trusted partners who only receive the data they need to complete the service." },
    { heading: "Your rights", body: "You can request a copy or deletion of your data by emailing privacy@kifayat.co." },
  ]} />,
});
