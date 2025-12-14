"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { useTranslation } from "@/hooks/useTranslation";

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-32 overflow-hidden">
      {/* Static gradient background - No animations for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-zinc-400">{t('hero.badge')}</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight"
        >
          <span className="block text-white pb-2">{t('hero.building')}</span>
          <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent pb-2">
            {t('hero.digital_experiences')}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.description_prefix')} <span className="text-cyan-400">{t('hero.description_logic')}</span> {t('hero.description_middle')}{" "}
          <span className="text-purple-400">{t('hero.description_animation')}</span>{t('hero.description_suffix')}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { value: "50+", label: t('hero.stats.projects') },
            { value: "99%", label: t('hero.stats.satisfaction') },
            { value: "3x", label: t('hero.stats.delivery') },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator - Simple CSS animation */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
        <div className="flex flex-col items-center animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-zinc-600/50 flex justify-center items-start pt-2">
            <div className="w-1 h-2 rounded-full bg-cyan-400" />
          </div>
          <svg
            className="w-4 h-4 text-zinc-500 mt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
