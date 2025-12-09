import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI/UX Design Services",
  description:
    "Modern UI/UX design services focused on conversion optimization. We create beautiful, intuitive interfaces that delight users and drive business results.",
  keywords: [
    "UI design",
    "UX design",
    "user interface design",
    "user experience design",
    "web design",
    "mobile app design",
    "conversion optimization",
    "interface design",
    "product design",
  ],
  alternates: {
    canonical: "https://blckbox.studio/services/ui-ux-design",
  },
  openGraph: {
    title: "UI/UX Design Services | BLACKBOX Digital Agency",
    description:
      "Modern UI/UX design focused on conversion optimization. Create interfaces that delight users.",
    url: "https://blckbox.studio/services/ui-ux-design",
  },
};

export default function UIUXDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

