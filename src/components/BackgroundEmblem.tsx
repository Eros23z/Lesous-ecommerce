"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundEmblem() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  const { scrollY } = useScroll();
  // En el home: empieza en 0 y sube progresivamente a 0.12 entre scroll 150 y 400
  const scrollOpacity = useTransform(scrollY, [150, 400], [0, 0.12]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <motion.div 
        className="relative w-[95vw] md:w-[60vw] max-w-[950px] aspect-[2400/846]"
        style={{
          filter: 'drop-shadow(0 0 45px rgba(194, 140, 40, 0.1))',
          opacity: isHome ? scrollOpacity : 0.12,
        }}
      >
        <Image
          src="/images/logo-full.png" 
          alt="Emblema Lesous"
          fill
          sizes="(max-width: 768px) 95vw, 60vw"
          className="object-contain"
        />
      </motion.div>
      
      {/* Viñeta sutil para desvanecer hacia los bordes oscuros */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,#020202_85%)]" />
    </div>
  );
}