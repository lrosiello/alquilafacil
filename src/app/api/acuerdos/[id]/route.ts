import {
    handleGetAcuerdoById,
    handleDeleteAcuerdo,
  } from "../../../controllers/acuerdoAlquilerController";
  
  // Manejar solicitudes GET (obtener una publicación por ID)
  export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    return handleGetAcuerdoById(req, params.id);
  }
  
  // Manejar solicitudes DELETE (eliminar una publicación por ID)
  export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    return handleDeleteAcuerdo(req, params.id);
  }
  