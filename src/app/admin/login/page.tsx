"use client";

import { useState } from "react";
import { FaArrowLeft, FaLock, FaGem } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importante para redirigir
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
// 1. Importamos el cliente de Auth Helpers
import { createClient } from "@/lib/supabase-browser";

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

export default function LoginPage() {
  const router = useRouter();
  // 2. Inicializamos el cliente de Supabase para componentes
  const supabase = createClient();

  // 3. Cambiamos 'user' por 'email' (Supabase requiere email)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 4. Lógica de Login con Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // 5. Login Exitoso: Refrescamos la ruta para actualizar cookies y redirigimos
      router.refresh(); 
      router.push("/admin/dashboard");
      
    } catch (err: any) {
      console.error("Login error:", err.message);
      // Mensaje místico de error
      setError("Las credenciales fueron rechazadas por el grimorio.");
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#020202]/0 text-[#E0E0E0] flex items-center justify-center p-4 relative overflow-hidden ${cinzel.variable} ${cormorant.variable} font-serif`}>
      
      {/* --- FONDO ATMOSFÉRICO --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#c28c28] rounded-full blur-[180px] opacity-[0.08]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-[#050505] border border-[#1A1A1A] p-10 relative z-10 group"
      >
        {/* Bordes Decorativos */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#c28c28]/30 group-hover:border-[#c28c28]/60 transition-colors" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#c28c28]/30 group-hover:border-[#c28c28]/60 transition-colors" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#c28c28]/30 group-hover:border-[#c28c28]/60 transition-colors" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#c28c28]/30 group-hover:border-[#c28c28]/60 transition-colors" />

        {/* --- BOTÓN VOLVER --- */}
        <div className="mb-8">
          <Link href="/catalogo">
            <button className="flex items-center gap-3 text-[#666] hover:text-[#c28c28] transition-colors group/back">
              <FaArrowLeft className="text-xs group-hover/back:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-cinzel)' }}>
                Regresar
              </span>
            </button>
          </Link>
        </div>

        {/* --- HEADER --- */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[#c28c28]/5 border border-[#c28c28]/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(179,148,91,0.1)]">
            <FaLock className="text-[#c28c28] text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-[#EAEAEA] tracking-widest uppercase text-center" style={{ fontFamily: 'var(--font-cinzel)' }}>
            Acceso Restringido
          </h1>
          <div className="h-[1px] w-12 bg-[#c28c28] mt-4 opacity-50" />
        </div>

        {/* --- FORMULARIO --- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] text-[#c28c28] uppercase tracking-[0.2em] font-bold ml-1" style={{ fontFamily: 'var(--font-cinzel)' }}>
                Correo Electrónico
            </label>
            <input
              type="email" // Importante: type email
              value={email} // Conectado al estado email
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#333] text-[#E0E0E0] px-4 py-3 focus:outline-none focus:border-[#c28c28] transition-colors placeholder-[#333]"
              placeholder="admin@lesous.com"
              style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-[#c28c28] uppercase tracking-[0.2em] font-bold ml-1" style={{ fontFamily: 'var(--font-cinzel)' }}>
                Palabra de Paso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#333] text-[#E0E0E0] px-4 py-3 focus:outline-none focus:border-[#c28c28] transition-colors placeholder-[#333]"
              placeholder="••••••••"
              style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm text-center py-2 bg-red-900/10 border border-red-900/30 tracking-wide font-light"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c28c28] hover:bg-[#C5A56A] text-[#050505] font-bold py-4 mt-4 transition-all uppercase tracking-[0.2em] relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
               {loading ? "Verificando..." : (
                   <>Ingresar <FaGem className="text-xs" /></>
               )}
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          </button>
        </form>

        <p className="text-center text-[#444] text-[10px] mt-8 uppercase tracking-[0.1em]">
            Mysterium Fidei • Solo personal autorizado
        </p>
      </motion.div>
    </div>
  );
}