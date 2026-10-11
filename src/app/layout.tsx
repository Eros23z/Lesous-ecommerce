import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagicCursor from "@/components/MagicCursor";
import BackgroundEmblem from "@/components/BackgroundEmblem";
import MagicParticles from "@/components/MagicParticles";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lesous Artefacts | Baúl",
  description: "Entre sombras y destellos, encontrá tu esencia. Catálogo exclusivo de artefactos, prendas, accesorios y joyería sagrada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cinzel.variable} ${cormorant.variable}`}>
      <body className="bg-[#020202] text-[#E0E0E0] antialiased">
        {/* El cursor va primero */}
        <MagicCursor />

        <BackgroundEmblem />

        <MagicParticles />
        
        <Header />
        
        {/* Main con padding para que el header fijo no tape contenido */}
        <main className="pt-24 min-h-screen relative z-10">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
