import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth";

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { error: "No autorizado. Sesión de maestro requerida." },
        { status: 401 }
      );
    }

    // 1. Esperamos a que se resuelvan los parámetros
    const params = await props.params;
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    // 2. Verificar si tiene productos antes de borrar
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      return NextResponse.json(
        { error: "La categoría no existe en el Baúl." },
        { status: 404 }
      );
    }

    if (category.products && category.products.length > 0) {
      return NextResponse.json(
        { error: "No se puede desintegrar una categoría que contiene artefactos." },
        { status: 400 }
      );
    }

    // 3. Eliminar
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Categoría eliminada correctamente." });
  } catch (error: any) {
    console.error("Error al eliminar categoría:", error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "La categoría no existe." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Error interno al eliminar la categoría." },
      { status: 500 }
    );
  }
}