"use client";

import Image from "next/image";

export default function BackgroundEmblem() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
      
      <div 
        className="relative w-[130vw] h-[130vw] md:w-[60vw] md:h-[60vw] max-w-[1200px] max-h-[1200px] mt-10"
        style={{
            // LA MAGIA OCURRE AQUÍ:
            // 1. grayscale(1): Quitamos el color rojo original.
            // 2. invert(1): El fondo blanco se vuelve NEGRO, las líneas negras se vuelven BLANCAS.
            // 3. sepia(1) + saturate(300%): Teñimos las líneas blancas de dorado intenso.
            // 4. brightness(0.6): Ajustamos la intensidad para que no encandile.
            filter: 'grayscale(1) invert(1) sepia(1) saturate(300%) hue-rotate(10deg) brightness(0.6) drop-shadow(0 0 10px rgba(179,148,91,0.5))',
            
            // 5. mix-blend-screen: Hace que el fondo negro (invertido) desaparezca y solo quede la luz (las líneas).
            mixBlendMode: 'screen',
            
            opacity: 0.15 // Ajusta esto: 0.1 es muy sutil, 0.2 es más visible
        }}
      >
        <Image
          src="/images/wicca-gold.png" 
          alt="Rueda Mística Lesous"
          fill
          className="object-contain"
          priority
        />
      </div>
      
      {/* Viñeta para que los bordes de la imagen se desvanezcan suavemente */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,#020202_70%)]"></div>
    </div>
  );
}