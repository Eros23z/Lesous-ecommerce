import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, price, description, imageUrl, category } = body;

        // SOLUCIÓN 1: Validar TODOS los campos obligatorios del Schema
        if (!name || !price || !category || !imageUrl) {
            return NextResponse.json(
                { error: "Faltan campos obligatorios (name, price, category, imageUrl)" }, 
                { status: 400 }
            );
        }

        const newProduct = await prisma.product.create({
            data: {
                name: name,
                // Aseguramos que el precio sea un número flotante
                price: price, 
                description: description || "", // Si es null, ponemos string vacío (opcional)
                stock: 1, // Stock por defecto
                imageUrl: imageUrl, 
                category: {
                    connectOrCreate: {
                        where: { name: category },
                        create: { name: category }
                    }
                }
            }
        });

        return NextResponse.json(newProduct);

    } catch (error: any) {
        console.error("Detalle del error:", error);

        // SOLUCIÓN 2: Capturar error de duplicados (P2002)
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: "Ya existe un producto con ese nombre exacto." }, 
                { status: 409 } // 409 Conflict
            );
        }

        return NextResponse.json(
            { error: "Error interno del servidor", details: error.message }, 
            { status: 500 }
        );
    }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const normalized = products.map(p => ({
        ...p,
        price: Number(p.price),
    }));

    // 🔒 SIEMPRE un array
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);

    // 🔒 Aunque haya error → array vacío
    return NextResponse.json([], { status: 500 });
  }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "ID de producto es requerido" }, { status: 400 });
        }
        await prisma.product.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Producto eliminado" });
    }
    catch (error) {
        console.error("Error al eliminar producto:", error);
        return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 });
    }
}