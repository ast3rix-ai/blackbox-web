"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  Code2,
  Globe,
  Zap,
  Database,
  Cpu,
  Layers,
  ArrowUpRight,
  Rocket,
  Calendar,
  Users,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Tech Stack Icons with colors
const techStack = [
  { icon: Code2, name: "TypeScript", color: "#3178c6" },
  { icon: Layers, name: "React", color: "#61dafb" },
  { icon: Globe, name: "Next.js", color: "#ffffff" },
  { icon: Cpu, name: "Python", color: "#3776ab" },
  { icon: Database, name: "PostgreSQL", color: "#336791" },
  { icon: Zap, name: "Node.js", color: "#68a063" },
];

// Services data
const services = [
  {
    id: "web",
    title: "Web Development",
    description: "High-performance Next.js applications",
    gradient: "from-cyan-500/20 via-transparent to-transparent",
  },
  {
    id: "bots",
    title: "AI Bots",
    description: "Custom automation & chatbots",
    gradient: "from-purple-500/20 via-transparent to-transparent",
  },
  {
    id: "design",
    title: "UI/UX Design",
    description: "Modern, conversion-focused interfaces",
    gradient: "from-pink-500/20 via-transparent to-transparent",
  },
];

// Draggable Tech Icon Component - GPU optimized
function DraggableTechIcon({
  tech,
  containerRef,
  index,
}: {
  tech: (typeof techStack)[0];
  containerRef: React.RefObject<HTMLDivElement | null>;
  index: number;
}) {
  const Icon = tech.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smoother spring config for 120fps
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const initialX = (index % 3 - 1) * 60;
  const initialY = (Math.floor(index / 3) - 0.5) * 50;

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
      style={{ 
        x: springX, 
        y: springY,
        willChange: "transform",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: initialX,
        y: initialY,
      }}
      transition={{ delay: index * 0.08, duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.08 }}
      whileDrag={{ scale: 1.15, zIndex: 20 }}
      className="absolute cursor-grab active:cursor-grabbing"
    >
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800"
        style={{
          boxShadow: `0 0 16px ${tech.color}15, 0 2px 8px rgba(0,0,0,0.2)`,
          transform: "translateZ(0)",
        }}
      >
        <Icon className="w-5 h-5" style={{ color: tech.color }} />
        <span className="text-sm font-medium text-zinc-300">{tech.name}</span>
      </div>
    </motion.div>
  );
}

// GPU-accelerated Card with smooth 120fps hover
function GlowCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl bg-zinc-900/50 border border-zinc-800/60 overflow-hidden group",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay }}
      style={{ 
        transform: "translateZ(0)", // Force GPU layer
        willChange: "transform",
      }}
    >
      {/* Hover overlay - uses opacity for GPU acceleration */}
      <div 
        className="absolute inset-0 bg-zinc-800/30 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ 
          transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "opacity",
        }}
      />
      {/* Border glow overlay */}
      <div 
        className="absolute inset-0 rounded-2xl border border-zinc-600/50 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ 
          transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "opacity",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// About Card with animated tagline
const TAGLINE_WORDS = ["grow", "scale", "innovate", "succeed"];

function AboutCard() {
  const [wordIndex, setWordIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % TAGLINE_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const capabilities = [
    { label: "Web Apps", icon: Globe },
    { label: "AI Solutions", icon: Cpu },
    { label: "Cloud Scale", icon: Zap },
  ];

  return (
    <GlowCard className="p-6 md:p-8 h-full" delay={0}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
            <span className="text-xl font-black text-black tracking-tighter">B</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">BLACKBOX</h3>
            <p className="text-sm text-zinc-500">Digital Agency</p>
          </div>
        </div>

        <p className="text-zinc-400 leading-relaxed mb-4">
          We transform complex problems into elegant, performant solutions.
          Specializing in modern web technologies, AI integrations, and
          pixel-perfect interfaces that{" "}
          <span className="text-cyan-400">convert visitors into customers</span>.
        </p>

        {/* Capabilities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {capabilities.map((cap) => (
            <div
              key={cap.label}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg group"
              style={{ transform: "translateZ(0)" }}
            >
              <div className="absolute inset-0 rounded-lg bg-zinc-800/50 border border-zinc-700/50" />
              <div 
                className="absolute inset-0 rounded-lg bg-zinc-800/80 border border-cyan-500/30 opacity-0 group-hover:opacity-100"
                style={{ 
                  transition: "opacity 120ms ease-out",
                  willChange: "opacity",
                }}
              />
              <cap.icon className="relative z-10 w-4 h-4 text-cyan-400" />
              <span className="relative z-10 text-xs text-zinc-300">{cap.label}</span>
            </div>
          ))}
        </div>

        {/* Animated tagline */}
        <div className="mt-auto pt-4 border-t border-zinc-800/50">
          <p className="text-sm text-zinc-500 flex items-center gap-1">
            We help businesses
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-cyan-400 font-medium"
              >
                {TAGLINE_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </p>
        </div>
      </div>
    </GlowCard>
  );
}

// Tech Stack Gravity Card
function TechStackCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <GlowCard className="p-6 md:p-8 h-full min-h-[280px]" delay={0.2}>
        <h3 className="text-lg font-semibold mb-2 text-white">Tech Arsenal</h3>
        <p className="text-sm text-zinc-500 mb-4">
          Drag & throw to explore our stack
        </p>

      <div
        ref={containerRef}
        className="relative h-40 flex items-center justify-center"
      >
        {techStack.map((tech, index) => (
          <DraggableTechIcon
            key={tech.name}
            tech={tech}
            containerRef={containerRef}
            index={index}
          />
        ))}
      </div>
    </GlowCard>
  );
}

// Services Card - Premium hover effect
function ServicesCard() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <GlowCard className="p-6 md:p-8 h-full" delay={0.3}>
      <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>

      <div className="space-y-3">
        {services.map((service) => (
          <motion.div
            key={service.id}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative flex items-center justify-between p-4 rounded-xl cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Base background */}
            <div className="absolute inset-0 rounded-xl bg-zinc-800/40" />
            
            {/* Gradient glow on hover */}
            <motion.div 
              className={cn(
                "absolute inset-0 rounded-xl bg-gradient-to-r",
                service.gradient
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredId === service.id ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Subtle border */}
            <motion.div 
              className="absolute inset-0 rounded-xl border"
              initial={{ borderColor: "rgba(63, 63, 70, 0.5)" }}
              animate={{ 
                borderColor: hoveredId === service.id 
                  ? "rgba(0, 245, 255, 0.3)" 
                  : "rgba(63, 63, 70, 0.5)" 
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Content */}
            <div className="relative z-10">
              <motion.h4 
                className="font-medium"
                animate={{ 
                  color: hoveredId === service.id ? "#00f5ff" : "#ffffff" 
                }}
                transition={{ duration: 0.2 }}
              >
                {service.title}
              </motion.h4>
              <p className="text-sm text-zinc-500">{service.description}</p>
            </div>
            
            <motion.div
              className="relative z-10"
              animate={{ 
                x: hoveredId === service.id ? 4 : 0,
                y: hoveredId === service.id ? -4 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight 
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors duration-200",
                  hoveredId === service.id ? "text-cyan-400" : "text-zinc-600"
                )}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </GlowCard>
  );
}

// Track Record Card - GPU-accelerated hover
function TrackRecordCard() {
  const achievements = [
    { metric: "50+", label: "Projects Delivered", Icon: Rocket, color: "text-cyan-400" },
    { metric: "5+", label: "Years in Business", Icon: Calendar, color: "text-purple-400" },
    { metric: "30+", label: "Happy Clients", Icon: Users, color: "text-pink-400" },
    { metric: "12", label: "Industries Served", Icon: Building2, color: "text-emerald-400" },
  ];

  return (
    <GlowCard className="p-6 md:p-8 h-full" delay={0.1}>
      <h3 className="text-lg font-semibold mb-4 text-white">Track Record</h3>

      <div className="grid grid-cols-2 gap-3">
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            className="relative p-3 rounded-xl text-center group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.1 }}
            style={{ transform: "translateZ(0)" }}
          >
            {/* Background layers for GPU-accelerated hover */}
            <div className="absolute inset-0 rounded-xl bg-zinc-800/30 border border-zinc-700/30" />
            <div 
              className="absolute inset-0 rounded-xl bg-zinc-800/50 border border-zinc-600/50 opacity-0 group-hover:opacity-100"
              style={{ 
                transition: "opacity 120ms ease-out",
                willChange: "opacity",
              }}
            />
            
            <div className="relative z-10">
              <item.Icon className={cn("w-5 h-5 mx-auto mb-1", item.color)} />
              <p className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {item.metric}
              </p>
              <p className="text-xs text-zinc-500 mt-1">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlowCard>
  );
}

// Main Bento Grid
export default function BentoGrid() {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          The <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Showcase</span>
        </h2>
        <p className="text-zinc-500 max-w-lg mx-auto">
          A glimpse into what we do and how we can help you achieve your goals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <AboutCard />
        </div>
        <div>
          <TrackRecordCard />
        </div>
        <div>
          <TechStackCard />
        </div>
        <div className="lg:col-span-2">
          <ServicesCard />
        </div>
      </div>
    </section>
  );
}
