import { NextResponse } from "next/server";
import * as publicacionService from "../services/publicacionService";
import validating from "./publicacionValidations";

export async function handleGetPublicaciones() {
  try {
    const publicaciones = await publicacionService.getAllPublicaciones();
    return new Response(JSON.stringify(publicaciones), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "Error al obtener las publicaciones" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function handleCreatePublicacion(req: Request) {
  const {
    titulo,
    descripcion,
    precio,
    direccion,
    localidad,
    estado,
    oferenteId,
  } = await req.json();

  // Realiza la validación de los datos
  const validation = validating(precio, estado);
  if (!validation.valid) {
    // Si no es válido, devuelve el mensaje de error
    return new Response(JSON.stringify({ error: validation.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Si la validación pasó, realiza la creación del usuario
  if (
    !titulo ||
    !descripcion ||
    !precio ||
    !direccion ||
    !localidad ||
    !estado ||
    !oferenteId
  ) {
    return new Response(
      JSON.stringify({ error: "Todos los campos son obligatorios" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const publicacion = await publicacionService.createPublicacion({
      titulo,
      descripcion,
      precio,
      direccion,
      localidad,
      estado,
      oferenteId,
    });
    return new Response(JSON.stringify(publicacion), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "Error al crear la publicacion" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Obtener publicación por ID
export async function handleGetPublicacionById(req: Request, id: string) {
  try {
    const publicacion = await publicacionService.getPublicacionById(Number(id));

    if (publicacion) {
      return NextResponse.json(publicacion, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Publicación no encontrada" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al obtener la publicación:", error);
    return NextResponse.json(
      { error: "Error al obtener la publicación" },
      { status: 500 }
    );
  }
}

// Actualizar publicación por ID
export async function handleUpdatePublicacion(req: Request, id: string) {
  const {
    titulo,
    descripcion,
    precio,
    direccion,
    localidad,
    estado,
    oferenteId,
  } = await req.json();

  try {
    const updatedPublicacion = await publicacionService.updatePublicacion(
      Number(id),
      {
        titulo,
        descripcion,
        precio,
        direccion,
        localidad,
        estado,
        oferenteId,
      }
    );

    return NextResponse.json(updatedPublicacion, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar la publicación:", error);
    return NextResponse.json(
      { error: "Error al actualizar la publicación" },
      { status: 500 }
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
    console.error("Error al eliminar la publicación:", error);
    return NextResponse.json(
      { error: "Error al eliminar la publicación" },
      { status: 500 }
    );
  }
}
