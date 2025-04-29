import {
    handleGetPublicacionById,
    handleUpdatePublicacion,
    handleDeletePublicacion,
  } from "../../../controllers/publicacionController";
  
  // Manejar solicitudes GET (obtener una publicación por ID)
  export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    return handleGetPublicacionById(req, params.id);
  }
  
  // Manejar solicitudes PUT (actualizar una publicación por ID)
  export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    return handleUpdatePublicacion(req, params.id);
  }
  
  // Manejar solicitudes DELETE (eliminar una publicación por ID)
  export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    return handleDeletePublicacion(req, params.id);
  }
  