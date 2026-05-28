import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/landing/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — Kifayat" }] }),
  component: () => <LegalPage title="Terms & Conditions" sections={[
    { heading: "Using Kifayat", body: "By accessing Kifayat.co you agree to these terms and our privacy policy. You must be 18+ or have parental consent to place orders." },
    { heading: "Orders & pricing", body: "All prices are in Pakistani Rupees and include applicable taxes. We reserve the right to cancel orders in case of pricing errors or fraud suspicion." },
    { heading: "Payment", body: "Payments are processed securely. By providing payment information you authorise us to charge the order amount to your selected method." },
    { heading: "Account responsibility", body: "You're responsible for keeping your password confidential and for all activity that occurs under your account." },
    { heading: "Liability", body: "Kifayat's liability is limited to the value of the order in question. We're not liable for indirect or consequential damages." },
  ]} />,
});
