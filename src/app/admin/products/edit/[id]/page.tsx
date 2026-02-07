import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/EditProductForm";

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  // Serializamos los datos para el cliente
  const plainProduct = {
    ...product,
    price: Number(product.price),
    // Aseguramos que stock sea número también
    stock: product.stock, 
    // Manejamos nulos por si acaso
    imageUrl: product.imageUrl || "",
    description: product.description || "",
    categoryName: product.category.name 
  };

  // Renderizamos SIN envoltorios con estilo (el componente se encarga del diseño)
  return <EditProductForm product={plainProduct} />;
}