import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { error: "No autorizado. Sesión de maestro requerida." },
        { status: 401 }
      );
    }

    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Identificador de producto inválido." },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Artefacto desintegrado correctamente." });
  } catch (error: any) {
    console.error("Error eliminando producto:", error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "El artefacto no existe en el Baúl." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Error interno del servidor al eliminar el artefacto." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { error: "No autorizado. Sesión de maestro requerida." },
        { status: 401 }
      );
    }

    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Identificador de producto inválido." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updateData: any = {};

    if (body.name !== undefined) {
      if (typeof body.name !== "string" || !body.name.trim()) {
        return NextResponse.json(
          { error: "El nombre no puede estar vacío." },
          { status: 400 }
        );
      }
      updateData.name = body.name.trim();
    }

    if (body.price !== undefined) {
      const numPrice = Number(body.price);
      if (isNaN(numPrice) || numPrice < 0) {
        return NextResponse.json(
          { error: "El precio debe ser un número válido mayor o igual a 0." },
          { status: 400 }
        );
      }
      updateData.price = numPrice;
    }

    if (body.description !== undefined) {
      updateData.description = typeof body.description === "string" ? body.description.trim() : "";
    }

    if (body.imageUrl !== undefined) {
      if (typeof body.imageUrl !== "string" || !body.imageUrl.trim()) {
        return NextResponse.json(
          { error: "La URL de imagen no puede estar vacía." },
          { status: 400 }
        );
      }
      updateData.imageUrl = body.imageUrl.trim();
    }

    if (body.stock !== undefined) {
      updateData.stock = Math.max(0, parseInt(body.stock, 10) || 0);
    }

    if (body.category && typeof body.category === "string" && body.category.trim()) {
      const categoryName = body.category.trim();
      updateData.category = {
        connectOrCreate: {
          where: { name: categoryName },
          create: { name: categoryName },
        },
      };
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error("Error actualizando producto:", error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "El artefacto no existe en el Baúl." },
        { status: 404 }
      );
    }
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Ya existe otro producto con ese nombre exacto." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Error al actualizar el artefacto." },
      { status: 500 }
    );
  }
}