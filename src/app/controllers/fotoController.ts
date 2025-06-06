import { NextResponse } from "next/server";
import * as fotoService from "../services/fotoService";

// Obtener todas las fotos
export async function handleGetFotos() {
  try {
    const fotos = await fotoService.getAllFotos();
    return NextResponse.json(fotos, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener las fotos" },
      { status: 500 }
    );
  }
}

// Crear una nueva foto
export async function handleCreateFoto(req: Request) {
  try {
    const fotoData = await req.json();
    const nuevaFoto = await fotoService.createFoto(fotoData);
    return NextResponse.json(nuevaFoto, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido al crear la foto" },
      { status: 400 }
    );
  }
}

// Obtener una foto por ID
export async function handleGetFotoById(req: Request, id: string) {
  try {
    const foto = await fotoService.getFotoById(Number(id));
    return NextResponse.json(foto, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al obtener la foto" },
      { status: 404 }
    );
  }
}

// Actualizar foto por ID
export async function handleUpdateFoto(req: Request, id: string) {
  try {
    const fotoData = await req.json();
    const fotoActualizada = await fotoService.updateFoto(Number(id), fotoData);
    return NextResponse.json(fotoActualizada, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido al actualizar la foto" },
      { status: 400 }
    );
  }
}

// Eliminar publicación por ID
export async function handleDeleteFoto(req: Request, id: string) {
  try {
    await fotoService.deleteFoto(Number(id));
    return NextResponse.json(
      { message: "Foto eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message :  "Error al eliminar la foto" },
      { status: 404 }
    );
  }
}
