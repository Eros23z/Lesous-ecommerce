"use client";

import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#020202]/50 text-[#E0E0E0] border-t border-[#c28c28]/20 pt-20 pb-10 overflow-hidden font-serif">
            
            {/* Fondo Sutil (Ruido + Luz) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[#c28c28] rounded-full blur-[150px] opacity-[0.05]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center">
                
                {/* --- SECCIÓN MÍSTICA (Puente visual) --- */}
                <div className="text-center mb-10 w-full flex flex-col items-center">
                    <p className="text-[#c28c28]/80 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 drop-shadow-lg" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        Mysterium Fidei
                    </p>
                    {/* Línea divisoria elegante con icono oficial */}
                    <div className="flex items-center justify-center gap-4 opacity-70">
                        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#c28c28]" />
                        <div className="relative w-8 h-8 flex items-center justify-center">
                          <Image src="/images/logo-icon.png" alt="Lesous Icon" fill sizes="32px" className="object-contain drop-shadow-[0_0_8px_rgba(194,140,40,0.5)]" />
                        </div>
                        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#c28c28]" />
                    </div>
                </div>

                {/* --- LOGO COMPLETO --- */}
                <div className="relative w-64 h-24 md:w-80 md:h-32 mb-8">
                  <Image 
                    src="/images/logo-full.png" 
                    alt="Lesous" 
                    fill 
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-contain drop-shadow-[0_0_18px_rgba(194,140,40,0.35)]"
                  />
                </div>

                {/* --- REDES SOCIALES (Estilo Orbes Mágicos) --- */}
                <div className="flex gap-8 mb-12">
                    <SocialLink href="https://www.instagram.com/lesous.sl/" icon={<FaInstagram />} label="Instagram" />
                    <SocialLink href="#" icon={<FaFacebookF />} label="Facebook" />
                    <SocialLink href="https://wa.me/5492664295883" icon={<FaWhatsapp />} label="WhatsApp" />
                </div>

                {/* --- LEGALES Y COPYRIGHT --- */}
                <div className="text-center space-y-4 border-t border-[#c28c28]/10 w-full pt-8 max-w-2xl">
                    <p className="text-[#888] text-sm tracking-wide" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        &copy; {currentYear} Lesous Artefacts. <span className="text-[#c28c28]/60">Forjado en la oscuridad.</span>
                    </p>
                    
                    <div className="flex flex-wrap gap-6 justify-center text-xs text-[#666] uppercase tracking-wider mt-4" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        <Link href="#" className="hover:text-[#c28c28] transition-colors duration-300 relative group">
                            Términos y Condiciones
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c28c28] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <span className="text-[#c28c28]/30">•</span>
                        <Link href="#" className="hover:text-[#c28c28] transition-colors duration-300 relative group">
                            Política de Privacidad
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c28c28] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Componente auxiliar para Iconos con efecto Glow
const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={label}
        className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-[#0a0a0a] border border-[#c28c28]/20 text-[#c28c28] transition-all duration-500 hover:scale-110 hover:border-[#B3945B] hover:shadow-[0_0_15px_rgba(179,148,91,0.3)]"
    >
        <span className="relative z-10 text-lg group-hover:text-[#FCD34D] transition-colors">
            {icon}
        </span>
        {/* Relleno sutil al hover */}
        <div className="absolute inset-0 rounded-full bg-[#c28c28]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </a>
);

export default Footer;