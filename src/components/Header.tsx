"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaGem, FaUserShield, FaSignOutAlt, FaSpinner } from 'react-icons/fa';
import { Cinzel } from 'next/font/google';
import { createClient } from "@/lib/supabase-browser";

// Configuramos la fuente Cinzel solo para este componente
const cinzel = Cinzel({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-cinzel',
});

const Header = () => {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isInAdminPanel = pathname.startsWith('/admin/dashboard');
  const isLoginPage = pathname === '/admin/login';

  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    // 1. Le decimos a Supabase que cierre la sesión
    await supabase.auth.signOut();
    
    // 2. Refrescamos para limpiar cookies del navegador y redirigimos
    router.refresh();
    router.push("/admin/login"); // O a /catalogo, donde prefieras
  };

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Catálogo', href: '/catalogo' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-[#020202]/50 backdrop-blur-md border-b border-[#c28c28]/20 ${cinzel.variable} font-serif`}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
        
        {/* --- LOGO --- */}
        <Link href="/" className="group flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 45, scale: 1.1 }} 
            className="text-[#c28c28] bg-[#c28c28]/10 p-2 rounded-full border border-[#c28c28]/20 transition-colors group-hover:bg-[#c28c28] group-hover:text-black"
          >
            <FaGem className="text-xl" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-[#EAEAEA] tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-cinzel)' }}>
              Lesous
            </span>
            <span className="text-[0.6rem] text-[#c28c28] tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
              Artefacts
            </span>
          </div>
        </Link>

        {/* --- NAV PRINCIPAL --- */}
        {!isLoginPage && (
          <nav className='hidden md:flex items-center gap-10'>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={`relative text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                    isActive ? 'text-[#c28c28]' : 'text-[#888] hover:text-[#EAEAEA]'
                  }`}
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  {item.name}
                  {isActive && (
                    <motion.div 
                      layoutId="dot" 
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#c28c28] rounded-full shadow-[0_0_8px_#c28c28]" 
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* --- ZONA DE ACCIONES --- */}
        <div className="flex items-center gap-4">
            
            {/* Botón Logout (Estilo Elegante) */}
            {isInAdminPanel && (
                <button 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={`group relative px-5 py-2 overflow-hidden border transition-all duration-300 rounded-sm
                        ${isLoggingOut 
                            ? 'border-gray-800 text-gray-600 cursor-not-allowed' 
                            : 'border-[#c28c28]/30 text-[#c28c28] hover:border-red-500/50 hover:text-red-400'
                        }
                    `}
                >
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        {isLoggingOut ? <FaSpinner className="animate-spin" /> : <FaSignOutAlt />}
                        <span>{isLoggingOut ? 'Cerrando...' : 'Salir'}</span>
                    </div>
                </button>
            )}

            {/* Botón Admin (Estilo Místico) */}
            {!isInAdminPanel && !isLoginPage && (
                <Link href="/admin/dashboard">
                    <button className="group relative px-6 py-2 bg-transparent overflow-hidden border border-[#c28c28]/20 hover:border-[#c28c28]/60 transition-colors rounded-sm">
                        <div className="absolute inset-0 bg-[#c28c28]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <div className="relative flex items-center gap-2 text-xs font-bold text-[#888] group-hover:text-[#c28c28] uppercase tracking-widest transition-colors" style={{ fontFamily: 'var(--font-cinzel)' }}>
                            <FaUserShield />
                            <span>Maestro</span>
                        </div>
                    </button>
                </Link>
            )}

        </div>

      </div>
    </motion.header>
  );
};

export default Header;