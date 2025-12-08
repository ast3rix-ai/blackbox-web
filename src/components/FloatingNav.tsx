"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Code, Bot, Palette, Sparkles, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Navigation items
const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Web Dev",
    href: "/services/web-development",
    icon: Code,
  },
  {
    label: "AI Bots",
    href: "/services/ai-bots",
    icon: Bot,
  },
  {
    label: "UI/UX",
    href: "/services/ui-ux-design",
    icon: Palette,
  },
];

export default function FloatingNav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll for subtle shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-[5000] hidden md:flex items-center gap-1 px-2 py-2 rounded-full",
          "bg-black/70 backdrop-blur-md border border-white/10",
          "shadow-lg shadow-black/20",
          isScrolled && "shadow-xl shadow-black/30"
        )}
      >
        {/* Nav Items */}
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                )}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* CTA Button */}
        <Link href="/#contact">
          <motion.div
            className="relative px-5 py-2 rounded-full text-sm font-semibold overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-100" />
            <div className="absolute inset-[1px] rounded-full bg-black/90" />
            
            <span className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Hire Us
            </span>
          </motion.div>
        </Link>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-4 left-4 right-4 z-[5000] md:hidden",
          "bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl",
          "shadow-lg shadow-black/20"
        )}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-lg">
            BLACKBOX
          </Link>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        className={cn(
                          "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        )}
                        whileTap={{ scale: 0.98 }}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full"
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}

                {/* Mobile CTA */}
                <Link href="/#contact">
                  <motion.div
                    className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="w-5 h-5" />
                    Hire Us
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Compact Mobile Bottom Bar (Alternative - Icons Only) */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed bottom-4 left-1/2 -translate-x-1/2 z-[5000] md:hidden",
          "flex items-center gap-1 px-2 py-2 rounded-full",
          "bg-black/80 backdrop-blur-md border border-white/10",
          "shadow-lg shadow-black/30"
        )}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  "relative p-3 rounded-full transition-colors duration-200",
                  isActive ? "text-white" : "text-zinc-500"
                )}
                whileTap={{ scale: 0.9 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-active"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <item.icon className="relative z-10 w-5 h-5" />
              </motion.div>
            </Link>
          );
        })}

        {/* CTA */}
        <Link href="/#contact">
          <motion.div
            className="relative p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
            whileTap={{ scale: 0.9 }}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
        </Link>
      </motion.nav>
    </>
  );
}

