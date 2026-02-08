/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Permite todos los subdominios de Supabase
      },
      // Si usas alguna otra fuente externa, agrégala aquí
    ],
  },
  // Esto ayuda a evitar errores de hidratación con ciertos atributos
  reactStrictMode: true,
  reactCompiler: true,
};

export default nextConfig;
