"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaTrash, FaPen, FaGem, FaBoxOpen, FaLayerGroup } from "react-icons/fa";
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import { useProducts } from "@/hooks/useProducts";
import ConfirmModal from "@/components/modals/ConfirmModal";
import AlertModal from "@/components/modals/AlertModal";

// --- FUENTES MÍSTICAS ---
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

export default function Dashboard() {
  const { products, loading, setProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, title: "", message: "" });

  const initiateDelete = (id: string) => {
      setDeleteTarget(id);
      setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const response = await fetch(`/api/products/${deleteTarget}`, { method: "DELETE" });
      
      // CAMBIO DE SEGURIDAD:
      // Verificamos si la respuesta es OK antes de intentar leer el JSON
      if (!response.ok) {
        // Si falló, intentamos leer el error, si no se puede, ponemos uno genérico
        const errorData = await response.json().catch(() => ({ error: "Error desconocido del servidor" }));
        throw new Error(errorData.error || "No se pudo eliminar");
      }
      
      // Si todo salió bien:
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget));
      setShowConfirmModal(false);
      setDeleteTarget(null);

    } catch (error: any) {
      console.error(error);
      setShowConfirmModal(false);
      setAlertModal({ 
        isOpen: true, // Recuerda usar isOpen según tu componente
        title: "Fallo en el Ritual", 
        message: error.message || "El grimorio no responde." 
      });
    }
  }

  // 3. Filtrado
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen bg-[#020202]/0 text-[#E0E0E0] font-serif selection:bg-[#c28c28]/30 ${cinzel.variable} ${cormorant.variable} pb-20`}>
      
      {/* --- FONDO ATMOSFÉRICO --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
         {/* Luz tenue en la esquina superior */}
         <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#c28c28] rounded-full blur-[150px] opacity-[0.08]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* --- ENCABEZADO: TÍTULO Y BOTÓN --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-[#c28c28]/20 pb-8">
          <div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#c28c28] text-xs font-bold uppercase tracking-[0.3em] mb-2"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Panel de Maestro
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl text-[#EAEAEA] font-bold tracking-wide"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Inventario Real
            </motion.h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link href="/admin/categories" className="w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full group relative px-8 py-4 bg-transparent border border-[#c28c28]/40 hover:border-[#c28c28] transition-colors overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#c28c28]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative flex items-center justify-center md:justify-start gap-3 text-[#c28c28] font-bold uppercase tracking-[0.15em] text-sm" style={{ fontFamily: 'var(--font-cinzel)' }}>
                  <FaLayerGroup className="text-xs" />
                  <span>Categorias</span>
                </div>
              </motion.button>
            </Link>

            <Link href="/admin/products" className="w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full group relative px-8 py-4 bg-transparent border border-[#c28c28]/40 hover:border-[#c28c28] transition-colors overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#c28c28]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative flex items-center justify-center md:justify-start gap-3 text-[#c28c28] font-bold uppercase tracking-[0.15em] text-sm" style={{ fontFamily: 'var(--font-cinzel)' }}>
                  <FaPlus className="text-xs" />
                  <span>Forjar Artefacto</span>
                </div>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* --- BARRA DE BÚSQUEDA --- */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-12 max-w-xl"
        >
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-[#666]">
            <FaSearch />
          </div>
          <input 
            type="text" 
            placeholder="Buscar en el grimorio..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-b border-[#333] text-[#E0E0E0] pl-10 pr-4 py-3 focus:outline-none focus:border-[#c28c28] transition-colors placeholder-[#444] text-lg font-light"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          />
        </motion.div>

        {/* --- TABLA DE ARTEFACTOS (Lista) --- */}
        <div className="space-y-4">
          
          {/* Cabecera de tabla visual */}
          <div className="hidden md:grid grid-cols-12 gap-6 px-6 pb-4 text-[10px] text-[#666] uppercase tracking-[0.2em] font-bold border-b border-[#333]" style={{ fontFamily: 'var(--font-cinzel)' }}>
            <div className="col-span-5">Artefacto</div>
            <div className="col-span-2">Valor</div>
            <div className="col-span-3">Clase</div>
            <div className="col-span-2 text-right">Rituales</div>
          </div>

          {loading ? (
             // SKELETON LOADING (Oscuro)
             [...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-[#0a0a0a] border border-[#1a1a1a] animate-pulse rounded-sm" />
             ))
          ) : (
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-[#050505] border border-[#1A1A1A] hover:border-[#c28c28]/30 p-4 transition-all duration-300"
                >
                  <div className="flex flex-col md:grid md:grid-cols-12 gap-6 items-center">
                    
                    {/* 1. INFO PRINCIPAL */}
                    <div className="col-span-5 flex items-center gap-6 w-full">
                      <div className="relative w-16 h-16 bg-[#0a0a0a] border border-[#222] shrink-0 overflow-hidden">
                         {product.imageUrl ? (
                           <Image 
                             src={product.imageUrl} 
                             alt={product.name} 
                             fill
                             className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                           />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-[#333]">
                             <FaBoxOpen />
                           </div>
                         )}
                      </div>
                      <div>
                        <h3 className="text-lg text-[#E0E0E0] group-hover:text-[#c28c28] transition-colors font-serif tracking-wide" style={{ fontFamily: 'var(--font-cinzel)' }}>
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    {/* 2. PRECIO */}
                    <div className="col-span-2 w-full md:w-auto flex justify-between md:block">
                      <span className="md:hidden text-[#666] text-xs uppercase tracking-widest">Valor:</span>
                      <span className="text-lg text-[#c28c28] font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        ${Number(product.price).toFixed(2)}
                      </span>
                    </div>

                    {/* 3. CATEGORÍA */}
                    <div className="col-span-3 w-full md:w-auto flex justify-between md:block">
                      <span className="md:hidden text-[#666] text-xs uppercase tracking-widest">Clase:</span>
                      <span className="inline-block px-3 py-1 bg-[#1A1A1A] border border-[#333] text-[#888] text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        {product.category?.name || "Sin Clasificar"}
                      </span>
                    </div>

                    {/* 4. ACCIONES */}
                    <div className="col-span-2 flex justify-end gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-[#1a1a1a] md:border-0">
                      
                      <Link href={`/admin/products/edit/${product.id}`}>
                        <button 
                          className="w-10 h-10 flex items-center justify-center border border-[#333] text-[#666] hover:border-[#c28c28] hover:text-[#c28c28] transition-all bg-[#080808]"
                          title="Modificar"
                        >
                          <FaPen size={12} />
                        </button>
                      </Link>

                      <button 
                        onClick={() => initiateDelete(product.id)}
                        className="w-10 h-10 flex items-center justify-center border border-[#333] text-[#666] hover:border-red-900 hover:text-red-500 hover:bg-red-900/10 transition-all bg-[#080808]"
                        title="Desintegrar"
                      >
                        <FaTrash size={12} />
                      </button>

                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* --- ESTADO VACÍO --- */}
        {!loading && filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-32 opacity-50 flex flex-col items-center"
          >
            <FaGem className="text-4xl text-[#333] mb-4" />
            <p className="text-xl text-[#666]" style={{ fontFamily: 'var(--font-cinzel)' }}>
                El grimorio está vacío.
            </p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 text-[#c28c28] text-sm hover:underline uppercase tracking-wider"
            >
              Limpiar búsqueda
            </button>
          </motion.div>
        )}

      </div>
      <ConfirmModal 
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="¿Desintegrar Artefacto?"
        message="Esta acción es irreversible. El objeto se perderá en el vacío."
      />

      <AlertModal 
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        title={alertModal.title}
        message={alertModal.message}
        type="error"
      />
    </div>
  );
}