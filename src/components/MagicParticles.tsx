"use client";

import { motion } from "framer-motion";

interface ParticleProps {
  id: number;
  delay: number;
  duration: number;
  top: number;
  left: number;
  moveX: number;
  moveY: number;
}

// Valores pseudo-aleatorios deterministas basados en índice para garantizar pureza en React 19
const PARTICLES: ParticleProps[] = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  delay: Number(((i * 1.317) % 7).toFixed(2)),
  duration: Number((((i * 1.942) % 6) + 4.5).toFixed(2)),
  top: Number(((i * 13.7) % 100).toFixed(2)),
  left: Number(((i * 19.3) % 100).toFixed(2)),
  moveX: Number((((i * 27.7) % 120) - 60).toFixed(2)),
  moveY: Number((((i * 17.1) % 120) - 70).toFixed(2)),
}));

const Particle = ({ delay, duration, top, left, moveX, moveY, id }: ParticleProps) => {
  // Variación sutil de tamaño entre partículas para más profundidad
  const sizeClass = id % 3 === 0 ? "w-1.5 h-1.5" : id % 2 === 0 ? "w-1 h-1" : "w-0.5 h-0.5";
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        top: `${top}%`, 
        left: `${left}%`, 
        scale: 0 
      }}
      animate={{ 
        opacity: [0, 0.75, 0],
        x: [0, moveX],
        y: [0, moveY],
        scale: [0, 1.4, 0]
      }}
      transition={{ 
        duration,
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
      className={`absolute ${sizeClass} bg-[#c28c28] rounded-full shadow-[0_0_8px_#c28c28] pointer-events-none`}
    />
  );
};

export default function MagicParticles() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden hidden sm:block">
      {PARTICLES.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </div>
  );
}