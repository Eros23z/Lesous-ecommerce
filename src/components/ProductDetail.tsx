"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaArrowLeft, FaGem, FaCube } from "react-icons/fa";
import { Cinzel, Cormorant_Garamond } from 'next/font/google';

// --- FUENTES ---
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

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  imageUrl?: string | null;
  stock: number;
  category: {
    name: string;
  };
}

export default function ProductDetail({ product }: { product: Product }) {
  const price = Number(product.price);
  const PHONE_NUMBER = "5492664295883"; 

  const handleContact = () => {
    const message = `Saludos. Deseo reclamar el artefacto "${product.name}" del Grimorio, listado en $${price.toFixed(2)}.`;
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`min-h-screen bg-[#020202]/60 text-[#E0E0E0] relative overflow-hidden ${cinzel.variable} ${cormorant.variable} font-serif pt-24 pb-20`}>
      
      {/* --- FONDO ATMOSFÉRICO --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
        {/* Luz focal sobre el producto */}
        <div className="absolute top-[20%] left-0 w-[50%] h-[50%] bg-[#B3945B] rounded-full blur-[150px] opacity-[0.05]" />
        <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-[#1A1A1A] rounded-full blur-[150px] opacity-20" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* --- NAVEGACIÓN SUPERIOR --- */}
        <div className="mb-12">
          <Link href="/catalogo">
             <button className="group flex items-center gap-3 text-[#888] hover:text-[#B3945B] transition-colors">
                <div className="p-2 rounded-full border border-[#333] group-hover:border-[#B3945B] transition-colors">
                    <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-cinzel)' }}>
                    Regresar al Grimorio
                </span>
             </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* --- COLUMNA IZQUIERDA: IMAGEN DEL ARTEFACTO --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full aspect-[4/5] lg:aspect-square bg-[#050505] border border-[#1A1A1A] rounded-sm p-4 group"
          >
            {/* Esquinas decorativas */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#B3945B]/30" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#B3945B]/30" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#B3945B]/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#B3945B]/30" />

            <div className="relative w-full h-full overflow-hidden bg-[#080808]">
                {product.imageUrl ? (
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    priority
                />
                ) : (
                <div className="flex flex-col items-center justify-center h-full text-[#333] gap-4">
                    <FaCube className="text-5xl opacity-20" />
                    <span className="font-serif italic opacity-40">Visualización Oculta</span>
                </div>
                )}
                
                {/* Brillo sutil sobre la imagen */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/80 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* --- COLUMNA DERECHA: DATOS DEL ARTEFACTO --- */}
          <div className="flex flex-col justify-center pt-8">
            
            {/* Categoría y Estado */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 mb-6"
            >
                <span className="text-[#B3945B] text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2" style={{ fontFamily: 'var(--font-cinzel)' }}>
                    <FaGem className="text-[10px]" />
                    {product.category?.name || "Objeto Raro"}
                </span>
                <div className="h-[1px] w-12 bg-[#333]" />
                <span className={`text-xs font-bold tracking-widest ${product.stock > 0 ? 'text-[#444]' : 'text-red-900'}`}>
                   {product.stock > 0 ? 'DISPONIBLE' : 'AGOTADO'}
                </span>
            </motion.div>
            
            {/* Nombre del Producto */}
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl text-[#EAEAEA] mb-8 leading-[0.9]"
                style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              {product.name}
            </motion.h1>

            {/* Precio */}
            <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex items-baseline gap-2 mb-8 border-b border-[#B3945B]/20 pb-8 origin-left"
            >
                <span className="text-4xl text-[#B3945B] font-light" style={{ fontFamily: 'var(--font-cinzel)' }}>
                ${price.toFixed(2)}
                </span>
                <span className="text-sm text-[#666] uppercase tracking-widest ml-2">Moneda Local</span>
            </motion.div>

            {/* Descripción */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="prose prose-invert max-w-none mb-12"
            >
              <p className="text-[#999] text-xl leading-relaxed font-light italic" style={{ fontFamily: 'var(--font-cormorant)' }}>
                {product.description || "Los orígenes de este objeto se han perdido en el tiempo, pero su poder permanece intacto..."}
              </p>
            </motion.div>

            {/* --- ZONA DE ACCIÓN --- */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
              <button 
                onClick={handleContact}
                disabled={product.stock === 0}
                className={`
                  relative w-full py-5 px-8 overflow-hidden transition-all duration-500 group
                  ${product.stock > 0 
                    ? 'bg-[#B3945B] hover:bg-[#C5A56A]' // Dorado sólido
                    : 'bg-[#1a1a1a] cursor-not-allowed border border-[#333]'}
                `}
              >
                {product.stock > 0 ? (
                  <div className="relative z-10 flex items-center justify-center gap-4 text-black font-bold uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-cinzel)' }}>
                    <span>Reclamar Artefacto</span>
                    <FaWhatsapp className="text-xl" />
                  </div>
                ) : (
                  <span className="text-[#444] uppercase tracking-widest font-bold">Fuera de Stock</span>
                )}

                {/* Efecto de Brillo al Hover */}
                {product.stock > 0 && (
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                )}
              </button>
              
              <div className="mt-6 flex justify-center items-center gap-2 text-[#444] text-[10px] uppercase tracking-[0.2em]">
                 <div className="w-1 h-1 rounded-full bg-[#B3945B]/50" />
                 <span>Transacción Directa con el Maestro</span>
                 <div className="w-1 h-1 rounded-full bg-[#B3945B]/50" />
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}