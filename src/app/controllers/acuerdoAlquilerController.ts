import { NextResponse } from "next/server";
import * as acuerdoAlquilerService from "../services/acuerdoAlquilerService";


// Obtener todas los acuerdos
export async function handleGetAcuerdos() {
  try {
    const acuerdos = await acuerdoAlquilerService.getAllAcuerdos();
    return NextResponse.json(acuerdos, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener los acuerdos" },
      { status: 500 }
    );
  }
}

// Crear una nuevo acuerdo
export async function handleCreateAcuerdo(req: Request) {
  try {
    const acuerdoData = await req.json();
    const nuevoAcuerdo = await acuerdoAlquilerService.createAcuerdo(acuerdoData);
    return NextResponse.json(nuevoAcuerdo, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido al crear el acuerdo" },
      { status: 400 }
    );
  }
}

// Obtener un acuerdo por ID
export async function handleGetAcuerdoById(req: Request, id: string) {
  try {
    const acuerdo = await acuerdoAlquilerService.getAcuerdoById(Number(id));
    return NextResponse.json(acuerdo, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al obtener acuerdo" },
      { status: 404 }
    );
  }
}


// Eliminar acuerdo por ID
export async function handleDeleteAcuerdo(req: Request, id: string) {
  try {
    await acuerdoAlquilerService.deleteAcuerdo(Number(id));
    return NextResponse.json(
      { message: "Acuerdo eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message :  "Error al eliminar el acuerdo" },
      { status: 404 }
    );
  }
}