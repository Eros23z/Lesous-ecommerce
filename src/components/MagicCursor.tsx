"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function MagicCursor() {
  // Usamos MotionValues para un rendimiento óptimo (sin re-renders de React)
  const mouseX = useMotionValue(-100); // Empieza fuera de pantalla
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Capturamos el movimiento en la VENTANA (window), no solo en un div
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: useMotionTemplate`
          radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            rgba(179, 148, 91, 0.06), 
            transparent 80%
          )
        `,
      }}
    />
  );
}