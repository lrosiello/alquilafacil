import { NextResponse } from "next/server";
import * as publicacionService from "../services/publicacionService";

// Obtener todas las publicaciones
export async function handleGetPublicaciones() {
  try {
    const publicaciones = await publicacionService.getAllPublicaciones();
    return NextResponse.json(publicaciones, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener las publicaciones" },
      { status: 500 }
    );
  }
}

// Crear una nueva publicación
export async function handleCreatePublicacion(req: Request) {
  try {
    const publicacionData = await req.json();
    const nuevaPublicacion = await publicacionService.createPublicacion(publicacionData);
    return NextResponse.json(nuevaPublicacion, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido al crear la publicación" },
      { status: 400 }
    );
  }
}

// Obtener una publicación por ID
export async function handleGetPublicacionById(req: Request, id: string) {
  try {
    const publicacion = await publicacionService.getPublicacionById(Number(id));
    return NextResponse.json(publicacion, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al obtener la publicación" },
      { status: 404 }
    );
  }
}

// Actualizar publicación por ID
export async function handleUpdatePublicacion(req: Request, id: string) {
  try {
    const publicacionData = await req.json();
    const publicacionActualizada = await publicacionService.updatePublicacion(Number(id), publicacionData);
    return NextResponse.json(publicacionActualizada, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido al crear la publicación" },
      { status: 400 }
    );
  }
}

// Eliminar publicación por ID
export async function handleDeletePublicacion(req: Request, id: string) {
  try {
    await publicacionService.deletePublicacion(Number(id));
    return NextResponse.json(
      { message: "Publicación eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message :  "Error al eliminar la publicación" },
      { status: 404 }
    );
  }
}
