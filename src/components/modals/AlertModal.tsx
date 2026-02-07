"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaTimes, FaCheckCircle } from "react-icons/fa";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'error' | 'success'; // Por si quieres usarlo para mensajes de éxito después
}

export default function AlertModal({ isOpen, onClose, title, message, type = 'error' }: AlertModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose} 
          />
           <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 20, opacity: 0 }} 
            className={`relative bg-[#050505] border p-6 max-w-sm w-full ${type === 'error' ? 'border-[#B3945B]/50' : 'border-green-500/30'}`}
          >
              <div className="flex items-start gap-4">
                  <div className={`text-xl mt-1 ${type === 'error' ? 'text-[#B3945B]' : 'text-green-500'}`}>
                      {type === 'error' ? <FaExclamationTriangle /> : <FaCheckCircle />}
                  </div>
                  <div>
                      <h4 className={`font-bold uppercase tracking-widest text-sm mb-2 ${type === 'error' ? 'text-[#B3945B]' : 'text-green-500'}`} style={{ fontFamily: 'var(--font-cinzel)' }}>
                          {title}
                      </h4>
                      <p className="text-[#AAA] font-light text-lg leading-snug" style={{ fontFamily: 'var(--font-cormorant)' }}>
                          {message}
                      </p>
                  </div>
              </div>
              <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-[#444] hover:text-[#EAEAEA] transition-colors"
              >
                  <FaTimes />
              </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}