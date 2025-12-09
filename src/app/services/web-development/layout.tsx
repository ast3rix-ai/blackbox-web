import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Services",
  description:
    "High-performance web development using Next.js, React, and TypeScript. We build scalable, fast, and SEO-optimized web applications that drive business growth and convert visitors into customers.",
  keywords: [
    "web development",
    "Next.js development",
    "React development",
    "TypeScript",
    "full-stack development",
    "web applications",
    "custom web development",
    "responsive web design",
  ],
  alternates: {
    canonical: "https://blckbox.studio/services/web-development",
  },
  openGraph: {
    title: "Web Development Services | BLACKBOX Digital Agency",
    description:
      "High-performance web development using Next.js, React, and TypeScript. Build scalable applications that convert.",
    url: "https://blckbox.studio/services/web-development",
  },
};

export default function WebDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

