"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function MagicCursor() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Hook incondicional en el nivel superior según las Reglas de Hooks de React
  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(179, 148, 91, 0.06), 
      transparent 80%
    )
  `;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsPointerDevice(mediaQuery.matches);

    if (mediaQuery.matches) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  if (!isPointerDevice) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 hidden md:block"
      style={{ background }}
    />
  );
}