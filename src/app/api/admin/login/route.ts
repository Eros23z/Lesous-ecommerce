export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { user, password } = await request.json();

    // 1. Validaciones básicas
    if (!user || !password) {
      return NextResponse.json(
        { message: "Faltan credenciales" },
        { status: 400 }
      );
    }

    // 2. Validar usuario
    if (user !== process.env.ADMIN_USERNAME) {
      return NextResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // 3. Validar contraseña 
    const isValid = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH!
    );

    if (!isValid) {
      return NextResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // 4. Crear JWT
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // 5. Setear cookie segura
    const cookieStore = await cookies();
    const isProd = process.env.NODE_ENV === "production";

    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: false,       // aca debe ir IsProd
      sameSite: "lax",   // máxima protección
      maxAge: 60 * 60,      // 1 hora
      path: "/",
    });

    return NextResponse.json({ message: "Login exitoso" });

  } catch (error) {
    return NextResponse.json(
      { message: "Error interno" },
      { status: 500 }
    );
  }
}
