"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Particle = ({ delay, duration }: { delay: number; duration: number }) => {
  const [randomValues] = useState(() => ({
    randomTop: Math.random() * 100,
    randomLeft: Math.random() * 100,
    moveX: Math.random() * 100 - 50,
    moveY: Math.random() * 100 - 50,
  }));

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        top: `${randomValues.randomTop}%`, 
        left: `${randomValues.randomLeft}%`,
        scale: 0 
      }}
      animate={{ 
        opacity: [0, 0.8, 0], // Aparece y desaparece
        x: [0, randomValues.moveX],        // Flota en X
        y: [0, randomValues.moveY],        // Flota en Y
        scale: [0, 1.5, 0]    // Crece y se achica
      }}
      transition={{ 
        duration: duration, // Duración entre 5 y 10 segundos
        repeat: Infinity, 
        delay: delay,
        ease: "easeInOut" 
      }}
      className="absolute w-1 h-1 bg-[#B3945B] rounded-full shadow-[0_0_5px_#B3945B] pointer-events-none"
    />
  );
};

export default function MagicParticles() {
  const [mounted, setMounted] = useState(() => {
    return true;
  });
  const [delays] = useState<number[]>(() =>
    Array.from({ length: 30 }).map(() => Math.random() * 5)
  );
  const [durations] = useState<number[]>(() =>
    Array.from({ length: 30 }).map(() => Math.random() * 5 + 5)
  );

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Generamos 30 partículas con delays diferentes */}
      {delays.map((delay, i) => (
        <Particle key={i} delay={delay} duration={durations[i] || 5} />
      ))}
    </div>
  );
}