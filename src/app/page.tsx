"use client";

import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import BotShowcase from "@/components/BotShowcase";
import MagneticCTA from "@/components/MagneticCTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BentoGrid />
      <BotShowcase />
      <MagneticCTA />
    </div>
  );
}
