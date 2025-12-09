"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

// Define page order for determining direction
const pageOrder = [
  "/",
  "/services/web-development",
  "/services/ai-bots",
  "/services/ui-ux-design",
  "/hire-us",
];

function getPageIndex(path: string): number {
  const index = pageOrder.indexOf(path);
  return index === -1 ? pageOrder.length : index;
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [direction, setDirection] = useState(0);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    const prevIndex = getPageIndex(prevPathRef.current);
    const currentIndex = getPageIndex(pathname);
    
    // Determine direction: 1 = forward (slide left), -1 = backward (slide right)
    if (currentIndex > prevIndex) {
      setDirection(1);
    } else if (currentIndex < prevIndex) {
      setDirection(-1);
    } else {
      setDirection(0);
    }
    
    prevPathRef.current = pathname;
  }, [pathname]);

  const variants = {
    initial: (direction: number) => ({
      x: direction === 0 ? 0 : direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction === 0 ? 0 : direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

