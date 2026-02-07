import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    request: Request,
    // CORRECCIÓN NEXT.JS 15: params es una Promesa
    props: { params: Promise<{ id: string }> }
) {
    try {
        // 1. Esperamos a que se resuelvan los parámetros
        const params = await props.params;
        const id = parseInt(params.id);

        if (isNaN(id)) {
             return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }

        // 2. Verificar si tiene productos antes de borrar
        const category = await prisma.category.findUnique({
            where: { id },
            include: { products: true }
        });

        if (category && category.products.length > 0) {
            return NextResponse.json(
                { error: "No se puede desintegrar una categoría que contiene artefactos." }, 
                { status: 400 }
            );
        }

        // 3. Eliminar
        await prisma.category.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Categoría eliminada" });
    } catch (error) {
        console.error("Error al eliminar:", error);
        return NextResponse.json({ error: "Error interno al eliminar" }, { status: 500 });
    }
}