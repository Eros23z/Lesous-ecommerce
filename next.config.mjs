/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg', 'pg'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Permite todos los subdominios de Supabase
      },
    ],
  },
  reactStrictMode: true,
  reactCompiler: true,
};

export default nextConfig;
