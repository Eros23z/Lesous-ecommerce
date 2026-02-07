"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaPlus, FaTrash, FaLayerGroup, FaSpinner, FaExclamationTriangle, FaTimes, FaCheck } from "react-icons/fa";
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import { useCategories } from "@/hooks/useCategories";
import ConfirmModal from "@/components/modals/ConfirmModal";
import AlertModal from "@/components/modals/AlertModal";

// Configuración de fuentes
const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cinzel' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-cormorant' });

export default function CategoriesPage() {
  const { categories, loading, refresh, setCategories } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // --- ESTADOS PARA LOS MODALES ---
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, title: "", message: "" });

  // 2. Crear Categoría
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    setSubmitting(true);
    setFormError("");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
        "Content-Type": "application/json", // ¡Importante!
      },
    // La clave debe ser "name" para coincidir con el backend: const name = body.name
      body: JSON.stringify({ name: newCategoryName }), 
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al crear");

      setNewCategoryName("");
      refresh();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // 3. INICIAR Proceso de Borrado (Abre el Modal)
  const initiateDelete = (id: number) => {
      setDeleteTarget(id);
      setShowConfirmModal(true);
  };

  // 4. EJECUTAR Borrado (Cuando confirman en el modal)
  const confirmDelete = async () => {
    if (deleteTarget === null) return;

    try {
      const res = await fetch(`/api/categories/${deleteTarget}`, { method: "DELETE" });
      const data = await res.json();
      
      setShowConfirmModal(false);

      if (!res.ok) {
        setAlertModal({
            isOpen: true,
            title: "Imposible Proceder",
            message: data.error || "No se pudo eliminar la categoría."
        });
        return;
      }
      
      setCategories(prev => prev.filter(c => c.id !== deleteTarget));
      setDeleteTarget(null);

    } catch (err) {
      setShowConfirmModal(false);
      setAlertModal({ 
        isOpen: true, 
        title: "Error de Conexión", 
        message: "No se pudo conectar con el grimorio." 
      });
    }
  };
  return (
    <div className={`min-h-screen bg-[#020202] text-[#E0E0E0] p-6 pt-24 font-serif ${cinzel.variable} ${cormorant.variable}`}>
      
      {/* Fondo Ambiental */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-[#B3945B] rounded-full blur-[150px] opacity-[0.05]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex items-center gap-4 mb-12 border-b border-[#B3945B]/20 pb-6">
          <Link href="/admin/dashboard">
            <button className="w-10 h-10 flex items-center justify-center rounded-sm border border-[#333] text-[#666] hover:text-[#B3945B] hover:border-[#B3945B] transition-colors">
              <FaArrowLeft />
            </button>
          </Link>
          <div>
             <p className="text-[#B3945B] text-[10px] uppercase tracking-[0.2em] font-bold" style={{ fontFamily: 'var(--font-cinzel)' }}>Configuración</p>
             <h1 className="text-3xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'var(--font-cinzel)' }}>Clases de Artefactos</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* --- COLUMNA 1: FORMULARIO DE CREACIÓN --- */}
          <div className="bg-[#050505] border border-[#1A1A1A] p-8 relative group h-fit">
            {/* Esquinas decorativas */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#B3945B]/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#B3945B]/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#B3945B]/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#B3945B]/40" />

            <h2 className="text-lg text-[#EAEAEA] mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-cinzel)' }}>
              <FaPlus className="text-[#B3945B] text-xs" /> Nueva Clase
            </h2>

            <form onSubmit={handleCreate} className="space-y-6">
              <div className="relative group/input">
                <input 
                  type="text" 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Nombre (ej. Talismanes)" 
                  className="w-full bg-[#0a0a0a] border border-[#333] text-[#E0E0E0] px-4 py-3 focus:outline-none focus:border-[#B3945B] transition-colors placeholder-[#444] font-light"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                />
              </div>

              {formError && (
                <div className="text-red-400 text-xs bg-red-900/10 p-3 border border-red-900/20 flex items-center gap-2">
                   <FaExclamationTriangle /> {formError}
                </div>
              )}

              <button 
                type="submit"
                disabled={submitting || !newCategoryName}
                className="w-full bg-[#B3945B] hover:bg-[#C5A56A] text-[#050505] py-3 font-bold uppercase tracking-[0.2em] text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                {submitting ? "Inscribiendo..." : "Agregar al Grimorio"}
              </button>
            </form>
          </div>

          {/* --- COLUMNA 2: LISTA DE CATEGORÍAS --- */}
          <div>
             <h2 className="text-[#B3945B] text-xs uppercase tracking-[0.2em] mb-6 font-bold" style={{ fontFamily: 'var(--font-cinzel)' }}>
               Clases Existentes
             </h2>

             {loading ? (
                <div className="flex justify-center py-10 text-[#B3945B]">
                   <FaSpinner className="animate-spin text-2xl" />
                </div>
             ) : (
               <ul className="space-y-3">
                 <AnimatePresence>
                   {categories.map((cat) => (
                     <motion.li 
                       key={cat.id}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: 10 }}
                       className="group flex justify-between items-center bg-[#080808] border border-[#1A1A1A] p-4 hover:border-[#B3945B]/30 transition-colors"
                     >
                       <div className="flex items-center gap-3">
                         <FaLayerGroup className="text-[#333] group-hover:text-[#B3945B] transition-colors" />
                         <span className="text-[#E0E0E0] text-lg font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>
                            {cat.name}
                         </span>
                         <span className="text-xs text-[#444] ml-2 font-mono">
                            ({cat._count?.products || 0})
                         </span>
                       </div>

                       <button 
                         onClick={() => initiateDelete(cat.id)} // CAMBIO AQUÍ: Usamos la nueva función
                         className="text-[#444] hover:text-red-500 transition-colors p-2"
                         title="Desintegrar Clase"
                       >
                         <FaTrash size={12} />
                       </button>
                     </motion.li>
                   ))}
                 </AnimatePresence>
               </ul>
             )}
             
             {categories.length === 0 && !loading && (
               <p className="text-[#666] italic text-sm text-center">No hay clases inscritas aún.</p>
             )}
          </div>
        </div>
      </div>

      {/* ============================================== */}
      {/* === MODAL DE CONFIRMACIÓN (DISEÑO MÍSTICO) === */}
      {/* ============================================== */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay Oscuro */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowConfirmModal(false)}
            />
            
            {/* Contenido del Modal */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#050505] border border-[#B3945B]/30 p-8 max-w-sm w-full shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-900/20 flex items-center justify-center text-red-500 mb-4 border border-red-900/40">
                    <FaTrash />
                </div>
                <h3 className="text-xl text-[#EAEAEA] mb-2 uppercase tracking-widest" style={{ fontFamily: 'var(--font-cinzel)' }}>
                    ¿Desintegrar Clase?
                </h3>
                <p className="text-[#888] text-sm font-light mb-8" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    Esta acción no se puede deshacer. Se eliminará permanentemente del grimorio.
                </p>
                
                <div className="flex gap-4 w-full">
                    <button 
                        onClick={() => setShowConfirmModal(false)}
                        className="flex-1 py-3 border border-[#333] text-[#888] hover:text-[#EAEAEA] hover:border-[#EAEAEA] transition-colors uppercase text-xs tracking-widest font-bold"
                        style={{ fontFamily: 'var(--font-cinzel)' }}
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={confirmDelete}
                        className="flex-1 py-3 bg-red-900/20 border border-red-900/50 text-red-500 hover:bg-red-900/40 transition-colors uppercase text-xs tracking-widest font-bold"
                        style={{ fontFamily: 'var(--font-cinzel)' }}
                    >
                        Confirmar
                    </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================== */}
      {/* === MODAL DE ALERTA (ERROR/INFO) === */}
      {/* ======================================== */}
      <ConfirmModal 
         isOpen={showConfirmModal}
         onClose={() => setShowConfirmModal(false)}
         onConfirm={confirmDelete}
         title="¿Desintegrar Clase?"
         message="Esta acción no se puede deshacer. Se eliminará permanentemente del grimorio."
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