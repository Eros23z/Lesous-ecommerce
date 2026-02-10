"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Cinzel, Cormorant_Garamond } from 'next/font/google';

// Solo para tipos
interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    category?: { name: string } | null;
}

const cinzel = Cinzel({ subsets: ['latin'], weight: ['700'], variable: '--font-cinzel' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400'], variable: '--font-cormorant' });

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`group relative h-full bg-[#050505] border border-[#1A1A1A] hover:border-[#c28c28]/40 transition-all duration-500 overflow-hidden ${cinzel.variable} ${cormorant.variable}`}
    >
      {/* Imagen */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0a0a0a]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#333]">
             Sin Imagen
          </div>
        )}
        
        {/* Overlay Gradiente al Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info del Producto */}
      <div className="p-6 relative">
        {/* Línea decorativa */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#c28c28] group-hover:w-3/4 transition-all duration-500" />

        <p className="text-[10px] text-[#c28c28] tracking-[0.2em] uppercase mb-2 text-center" style={{ fontFamily: 'var(--font-cinzel)' }}>
            {product.category?.name || "Artefacto"}
        </p>

        <h3 className="text-xl text-[#E0E0E0] mb-3 text-center truncate font-serif" style={{ fontFamily: 'var(--font-cinzel)' }}>
          {product.name}
        </h3>

        <p className="text-[#888] text-center text-lg italic group-hover:text-[#c28c28] transition-colors" style={{ fontFamily: 'var(--font-cormorant)' }}>
          ${product.price}
        </p>
      </div>
    </motion.div>
  );
}