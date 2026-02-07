// src/app/catalogo/[id]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetail from "@/components/ProductDetail"; // Importamos el componente visual

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// 1. Esto es un SERVER COMPONENT (por defecto, sin "use client")
// Puede consultar la DB directamente y es async.
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  // 2. Consulta Directa a la Base de Datos
  // Esto ocurre en el servidor antes de enviar nada al navegador.
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
  });

  // 3. Validación
  if (!product) {
    notFound();
  }

  const plainProduct = {
    ...product,
    price: product.price.toNumber(), // Convertimos el Decimal de Prisma a Número simple
    createdAt: product.createdAt.toISOString(), // (Opcional) A veces las fechas también molestan
    updatedAt: product.updatedAt.toISOString(),
  };

  // 4. Pasamos los datos al componente Cliente ("Hydration")
  // NOTA: Convertimos el Decimal de prisma a número o string si es necesario, 
  // pero el componente visual ya maneja Number(price), así que lo pasamos directo.
  return <ProductDetail product={plainProduct} />;
}