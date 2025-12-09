import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Us - Start Your Project",
  description:
    "Ready to build something amazing? Contact BLACKBOX Digital Agency to discuss your web development, AI chatbot, or UI/UX design project. Get a free consultation today.",
  keywords: [
    "hire web developer",
    "hire digital agency",
    "web development quote",
    "AI chatbot development",
    "UI/UX design services",
    "contact digital agency",
    "project consultation",
    "free quote",
  ],
  alternates: {
    canonical: "https://blckbox.studio/hire-us",
  },
  openGraph: {
    title: "Hire Us | BLACKBOX Digital Agency",
    description:
      "Ready to build something amazing? Contact us to discuss your project and get a free consultation.",
    url: "https://blckbox.studio/hire-us",
  },
};

export default function HireUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

