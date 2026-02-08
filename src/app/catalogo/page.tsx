"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard"; 
import { useState, useEffect, useMemo } from "react"; 
import Link from "next/link";
import { FaSearch, FaMagic, FaGem, FaLayerGroup } from "react-icons/fa";
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

// --- FUENTES ---
const cinzel = Cinzel({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-cinzel',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
});

export default function CatalogoPage() {
  const { products, loading: loadingProducts } = useProducts();
  const { categories, loading: loadingCategories } = useCategories();
  // Loader general (si alguno de los dos está cargando)
  const loading = loadingProducts || loadingCategories;
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products.filter((product) => {
      const prodName = (product.name || "").toLowerCase();
      const prodCat = (product.category?.name || "").toLowerCase(); 
      const searchLower = searchTerm.toLowerCase();
      const activeCatLower = activeCategory.toLowerCase();

      const matchesSearch = prodName.includes(searchLower);
      const matchesCategory = activeCategory === "Todos" || prodCat === activeCatLower;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, activeCategory]);

  // --- LOADER ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
         <motion.div 
           animate={{ rotate: 360, scale: [1, 1.2, 1] }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           className="relative text-[#B3945B]"
         >
           <FaGem className="text-4xl drop-shadow-[0_0_15px_rgba(179,148,91,0.5)]" />
           <div className="absolute inset-0 blur-lg bg-[#B3945B]/40" />
         </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#020202]/60 text-[#E0E0E0] relative overflow-hidden selection:bg-[#B3945B]/30 ${cinzel.variable} ${cormorant.variable} font-serif`}>
      
      {/* --- FONDO ATMOSFÉRICO --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-[#B3945B] rounded-full blur-[180px] opacity-[0.08]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-12">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#B3945B] text-xs uppercase font-bold mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>
            Colección Sagrada
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl text-[#EAEAEA] mb-6 drop-shadow-2xl" style={{ fontFamily: 'var(--font-cinzel)' }}>
            El Grimorio
          </motion.h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#B3945B] to-transparent mx-auto mb-6" />
        </div>

        {/* --- BARRA DE FILTROS INTEGRADA --- */}
        <div className="mb-16 flex flex-col items-center gap-8">
            
            {/* Buscador */}
            <div className="relative group w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-[#B3945B]/50 pl-2">
                <FaSearch />
              </div>
              <input 
                type="text" 
                placeholder="Invocar artefacto..." 
                className="w-full bg-transparent border-b border-[#333] text-[#E0E0E0] pl-10 pr-4 py-3 focus:outline-none focus:border-[#B3945B] transition-colors placeholder-[#444]"
                style={{ fontFamily: 'var(--font-cormorant)' }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* --- CONTENEDOR DE CATEGORÍAS (HÍBRIDO) --- */}
            <div className="w-full max-w-5xl flex items-center justify-center gap-4">
                
                {/* 1. BOTÓN "TODOS" (FIJO) */}
                <button
                    onClick={() => setActiveCategory("Todos")}
                    className={`relative px-4 py-2 text-sm uppercase tracking-widest transition-all duration-300 flex-shrink-0 flex items-center gap-2 border border-transparent ${
                    activeCategory === "Todos" 
                        ? "text-[#B3945B] border-[#B3945B]/30 bg-[#B3945B]/5" 
                        : "text-[#666] hover:text-[#B3945B]"
                    }`}
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                    <FaLayerGroup className="text-xs" />
                    <span>Todos</span>
                </button>

                {/* Separador Visual */}
                <div className="w-[1px] h-6 bg-[#333]" />

                {/* 2. LISTA SCROLLABLE (EL RESTO) */}
                <div className="relative group/scroll overflow-hidden flex-1">
                    {/* Degradado derecho */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

                    <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide snap-x items-center">
                        {categories.map((cat) => (
                        <button
                            key={cat.id} // Usamos el ID único
                            onClick={() => setActiveCategory(cat.name)} // Guardamos el nombre en el estado
                            className={`relative px-6 py-2 text-sm uppercase tracking-widest transition-all duration-300 flex-shrink-0 snap-center rounded-sm ${
                            activeCategory === cat.name 
                                ? "text-[#EAEAEA]" 
                                : "text-[#555] hover:text-[#B3945B]"
                            }`}
                            style={{ fontFamily: 'var(--font-cinzel)' }}
                        >
                            {cat.name} 
                            
                            {/* Línea Activa */}
                            {activeCategory === cat.name && (
                            <motion.div 
                                layoutId="activeCat"
                                className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B3945B] shadow-[0_0_10px_#B3945B]"
                            />
                            )}
                        </button>
                        ))}
                    </div>
                </div>
            </div>

        </div>

        {/* --- REJILLA --- */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product, index) => (
            <motion.div 
              layout 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.05 }} 
              key={product.id}
            >
              <Link href={`/catalogo/${product.id}`} className="block h-full">
                 <ProductCard product={product} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* --- EMPTY STATE --- */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32 opacity-50 flex flex-col items-center">
            <FaMagic className="text-6xl text-[#333] mb-6" />
            <p className="text-2xl text-[#666]" style={{ fontFamily: 'var(--font-cinzel)' }}>
                Silencio absoluto...
            </p>
            <button 
                onClick={() => { setActiveCategory("Todos"); setSearchTerm(""); }}
                className="mt-4 text-[#B3945B] text-sm hover:underline"
            >
                Restaurar visión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}