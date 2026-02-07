import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // <--- IMPORTANTE: Promise
) {
    try {
        const resolvedParams = await params; // <--- IMPORTANTE: Await
        const id = resolvedParams.id;

        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Artefacto desintegrado correctamente" });
    } catch (error) {
        console.error("Error eliminando producto:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

// Aprovechamos para arreglar el PUT (Editar) también:
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        const body = await request.json();

        // Lógica para conectar categoría si viene en el body
        let categoryConnect = {};
        if (body.category) {
            const category = await prisma.category.findUnique({ where: { name: body.category } });
            if (category) {
                categoryConnect = { category: { connect: { id: category.id } } };
            }
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name: body.name,
                price: body.price,
                description: body.description,
                imageUrl: body.imageUrl,
                stock: body.stock,
                ...categoryConnect
            }
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Error actualizando producto:", error);
        return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
    }
}