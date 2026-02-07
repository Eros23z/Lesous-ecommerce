import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        // Leemos el cuerpo completo
        const body = await request.json();

        // Extraemos 'name'. Si el frontend manda { name: "..." }, esto funcionará.
        const name = body.name;

        if (!name || typeof name !== 'string' || !name.trim()) {
            return NextResponse.json({ error: "El nombre de la categoría es requerido" }, { status: 400 });
        }

        const newCategory = await prisma.category.create({
            data: { 
                name: name.trim() // Guardamos sin espacios extra
            },
        });

        return NextResponse.json(newCategory);

    } catch (error: any) {
        console.error("Error en POST category:", error);

        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: "Esa categoría ya existe en el grimorio." }, 
                { status: 409 }
            );
        }
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

export async function GET() {
  try {
    const category = await prisma.category.findMany({
        orderBy: { name: 'asc' }, // Ordenarlas alfabéticamente queda mejor
        include: {
            _count: { select: { products: true } } // Contamos productos para saber si podemos borrarla
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

