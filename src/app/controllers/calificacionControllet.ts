import { NextResponse } from "next/server";
import * as calificacionService from "../services/calificacionService";

// Obtener todas las calificaciones
export async function handleGetCalificaciones() {
  try {
    const calificaciones = await calificacionService.getAllCalificaciones();
    return NextResponse.json(calificaciones, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener las calificaciones" },
      { status: 500 }
    );
  }
}

// Crear una nueva calificacion
export async function handleCreateCalificacion(req: Request) {
  try {
    const calificacionData = await req.json();
    const nuevaCalificacion = await calificacionService.createCalificacion(calificacionData);
    return NextResponse.json(nuevaCalificacion, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido al crear la calificacion" },
      { status: 400 }
    );
  }
}

// Obtener una calificacion por ID
export async function handleGetCalificacionById(req: Request, id: string) {
  try {
    const calificacion = await calificacionService.getCalificacionById(Number(id));
    return NextResponse.json(calificacion, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al obtener la calificacion" },
      { status: 404 }
    );
  }
}

// Eliminar calificacion por ID
export async function handleDeleteCalificacion(req: Request, id: string) {
  try {
    await calificacionService.deleteCalificacion(Number(id));
    return NextResponse.json(
      { message: "Calificacion eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message :  "Error al eliminar la calificacion" },
      { status: 404 }
    );
  }
}
