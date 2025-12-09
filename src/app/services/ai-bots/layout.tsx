import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chatbot Development Services",
  description:
    "Custom AI chatbot development and automation solutions. We build intelligent conversational AI, customer support bots, and workflow automation that scale your business 24/7.",
  keywords: [
    "AI chatbots",
    "chatbot development",
    "conversational AI",
    "customer support automation",
    "AI automation",
    "custom chatbots",
    "business automation",
    "intelligent assistants",
  ],
  alternates: {
    canonical: "https://blckbox.studio/services/ai-bots",
  },
  openGraph: {
    title: "AI Chatbot Development | BLACKBOX Digital Agency",
    description:
      "Custom AI chatbot development and automation solutions. Build intelligent bots that work 24/7.",
    url: "https://blckbox.studio/services/ai-bots",
  },
};

export default function AIBotsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

