import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { error: "No autorizado. Sesión de maestro requerida." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, price, description, imageUrl, category, stock } = body;

    // Validación de campos obligatorios y tipos
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "El nombre del producto es obligatorio." },
        { status: 400 }
      );
    }

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice < 0) {
      return NextResponse.json(
        { error: "El precio debe ser un número válido mayor o igual a 0." },
        { status: 400 }
      );
    }

    if (!category || typeof category !== "string" || !category.trim()) {
      return NextResponse.json(
        { error: "La categoría del producto es obligatoria." },
        { status: 400 }
      );
    }

    if (!imageUrl || typeof imageUrl !== "string" || !imageUrl.trim()) {
      return NextResponse.json(
        { error: "La imagen del producto es obligatoria." },
        { status: 400 }
      );
    }

    const numStock = stock !== undefined ? Math.max(0, parseInt(stock, 10) || 0) : 1;

    const newProduct = await prisma.product.create({
      data: {
        name: name.trim(),
        price: numPrice,
        description: typeof description === "string" ? description.trim() : "",
        stock: numStock,
        imageUrl: imageUrl.trim(),
        category: {
          connectOrCreate: {
            where: { name: category.trim() },
            create: { name: category.trim() },
          },
        },
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error("Detalle del error al crear producto:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Ya existe un producto con ese nombre exacto." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
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

    const normalized = products.map((p) => ({
      ...p,
      price: Number(p.price),
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json([], { status: 500 });
  }
}