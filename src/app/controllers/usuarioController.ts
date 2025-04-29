import { NextResponse } from "next/server";
import * as usuarioService from "../services/usuarioService";

// Obtener todos los usuarios
export async function handleGetUsuarios() {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    return NextResponse.json(usuarios, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener los usuarios" },
      { status: 500 }
    );
  }
}

// Crear nuevo usuario
export async function handleCreateUsuario(req: Request) {
  try {
    const usuarioData = await req.json();
    const nuevoUsuario = await usuarioService.createUsuario(usuarioData);
    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido al crear usuario" },
      { status: 400 }
    );
  }
}

// Obtener un usuario por ID
export async function handleGetUsuarioById(req: Request, id: string) {
  try {
    const usuario = await usuarioService.getUsuarioById(Number(id));
    return NextResponse.json(usuario, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al obtener usuario" },
      { status: 404 }
    );
  }
}

// Actualizar usuario por ID
export async function handleUpdateUsuario(req: Request, id: string) {
  try {
    const usuarioData = await req.json();
    const usuarioActualizado = await usuarioService.updateUsuario(Number(id), usuarioData);
    return NextResponse.json(usuarioActualizado, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido al crear usuario" },
      { status: 400 }
    );
  }
}

// Eliminar usuario por ID
export async function handleDeleteUsuario(req: Request, id: string) {
  try {
    await usuarioService.deleteUsuario(Number(id));
    return NextResponse.json(
      { message: "Usuario eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al eliminar usuario" },
      { status: 404 }
    );
  }
}
