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
    const name = body.name;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "El nombre de la categoría es requerido." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    if (trimmedName.length > 80) {
      return NextResponse.json(
        { error: "El nombre de la categoría no puede exceder 80 caracteres." },
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        name: trimmedName,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.error("Error en POST category:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Esa categoría ya existe en el Baúl." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor al crear categoría." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener las categorías." },
      { status: 500 }
    );
  }
}
