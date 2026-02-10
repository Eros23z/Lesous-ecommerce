"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay Oscuro */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={onClose} 
          />
          
          {/* Contenido del Modal */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.9, opacity: 0 }} 
            className="relative bg-[#050505] border border-[#c28c28]/30 p-8 max-w-sm w-full shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-900/20 flex items-center justify-center text-red-500 mb-4 border border-red-900/40">
                  <FaTrash />
              </div>
              
              <h3 className="text-xl text-[#EAEAEA] mb-2 uppercase tracking-widest" style={{ fontFamily: 'var(--font-cinzel)' }}>
                  {title}
              </h3>
              
              <p className="text-[#888] text-sm font-light mb-8" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  {message}
              </p>
              
              <div className="flex gap-4 w-full">
                  <button 
                      onClick={onClose}
                      className="flex-1 py-3 border border-[#333] text-[#888] hover:text-[#EAEAEA] hover:border-[#EAEAEA] transition-colors uppercase text-xs tracking-widest font-bold"
                      style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                      Cancelar
                  </button>
                  <button 
                      onClick={onConfirm}
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
  );
}