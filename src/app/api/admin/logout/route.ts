import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    
    // MÉTODO INFALIBLE: Sobrescribir la cookie para que expire ya mismo.
    // Usamos EXACTAMENTE las mismas opciones que en el login (secure: false, path: /)
    cookieStore.set("admin_session", "", {
        httpOnly: true,
        secure: false, // <--- ¡Esto es clave! Debe coincidir con el Login
        expires: new Date(0), // Fecha en el pasado (1970)
        maxAge: 0,
        path: "/",
    });

    // También enviamos cabeceras para limpiar caché del navegador
    return NextResponse.json(
        { message: "Sesión cerrada exitosamente" },
        { 
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        }
    );
}