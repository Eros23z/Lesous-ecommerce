"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { FaGem, FaMagic, FaDragon, FaArrowRight } from "react-icons/fa";
import { Cinzel, Cormorant_Garamond } from 'next/font/google';

// --- CONFIGURACIÓN DE FUENTES ---
const cinzel = Cinzel({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-cinzel',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cormorant',
});

export default function Home() {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

  // --- LÓGICA DEL CURSOR MÁGICO ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div 
      className={`relative min-h-screen bg-[#020202]/20 text-[#E0E0E0] overflow-hidden selection:bg-[#B3945B]/30 ${cinzel.variable} ${cormorant.variable} font-serif`}
      
    >
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 z-10">
        
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="flex flex-col items-center relative">
          
          {/* Icono Principal con Halo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative mb-10"
          >
            <div className="absolute inset-0 bg-[#B3945B] blur-[60px] opacity-20 animate-pulse" />
            <FaGem className="text-[#B3945B] text-7xl relative z-10 drop-shadow-[0_0_15px_rgba(179,148,91,0.5)]" />
          </motion.div>

          {/* Título Principal */}
          <h1 className="text-6xl md:text-9xl font-bold tracking-widest text-[#EAEAEA] mix-blend-overlay opacity-90" style={{ fontFamily: 'var(--font-cinzel)' }}>
            LESOUS
          </h1>
          
          {/* Subtítulo Dorado con efecto de brillo */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 text-xl md:text-3xl text-[#B3945B]/80 max-w-2xl font-light italic tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Donde la magia antigua se forja en metal eterno.
          </motion.p>

          {/* Botón CTA Mejorado */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16"
          >
            <Link href="/catalogo">
              <button className="group relative px-12 py-5 bg-transparent overflow-hidden border border-[#B3945B]/30 transition-all hover:border-[#B3945B]">
                {/* Fondo que se llena */}
                <div className="absolute inset-0 w-0 bg-[#B3945B] transition-all duration-[250ms] ease-out group-hover:w-full opacity-10" />
                
                <span className="relative flex items-center gap-4 text-[#B3945B] group-hover:text-[#FCD34D] tracking-[0.25em] text-sm font-bold uppercase" style={{ fontFamily: 'var(--font-cinzel)' }}>
                  Grimorio
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-2" />
                </span>
                
                {/* Esquinas Doradas */}
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#B3945B]" />
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#B3945B]" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#B3945B]" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#B3945B]" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SECCIÓN DE "LA ESENCIA" (Con más detalle) --- */}
      <section className="relative py-32 px-6 max-w-7xl mx-auto z-10">
        
        {/* Título de Sección con adornos */}
        <div className="text-center mb-24 relative">
            <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-9xl opacity-[0.03] font-bold pointer-events-none" style={{ fontFamily: 'var(--font-cinzel)' }}>
                ARCANA
            </span>
            <h2 className="text-3xl md:text-5xl text-[#D4D4D4] relative z-10" style={{ fontFamily: 'var(--font-cinzel)' }}>
                La Esencia
            </h2>
            <div className="flex justify-center items-center gap-4 mt-4 opacity-60">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#B3945B]" />
                <div className="w-2 h-2 rotate-45 bg-[#B3945B]" />
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#B3945B]" />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <MagicCard 
            icon={<FaMagic />} 
            title="Encantamientos" 
            desc="No vendemos objetos, entregamos talismanes imbuidos de historia y propósito." 
          />
          <MagicCard 
            icon={<FaGem />} 
            title="Cristales Puros" 
            desc="Seleccionados no por su precio, sino por su resonancia y vibración energética." 
          />
          <MagicCard 
            icon={<FaDragon />} 
            title="Diseño Oculto" 
            desc="Geometría sagrada y simbología alquímica oculta en cada curva del metal." 
          />
        </div>
      </section>
    </div>
  );
}

// --- TARJETA REFINADA CON BORDES MÁGICOS ---
function MagicCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10 }}
      className="group relative p-8 bg-[#050505] border border-[#ffffff]/5 transition-all duration-500 hover:bg-[#0a0a0a]"
    >
      {/* Esquinas que aparecen al hover */}
      <div className="absolute top-0 left-0 w-full h-full border border-[#B3945B]/0 group-hover:border-[#B3945B]/30 transition-all duration-700" />
      
      {/* Icono Flotante */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#B3945B]/5 flex items-center justify-center mb-6 text-2xl text-[#B3945B] group-hover:scale-110 group-hover:bg-[#B3945B]/10 group-hover:shadow-[0_0_20px_rgba(179,148,91,0.2)] transition-all duration-500">
          {icon}
        </div>
        
        <h3 className="text-2xl text-[#E0E0E0] mb-4 group-hover:text-[#B3945B] transition-colors" style={{ fontFamily: 'var(--font-cinzel)' }}>
          {title}
        </h3>
        
        <p className="text-[#999] text-lg font-light leading-relaxed group-hover:text-[#ccc]" style={{ fontFamily: 'var(--font-cormorant)' }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}