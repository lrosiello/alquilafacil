import {
    handleGetFotoById,
    handleDeleteFoto,
  } from "../../../controllers/fotoController";
  
  // Manejar solicitudes GET (obtener una foto por ID)
  export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    return handleGetFotoById(req, params.id);
  }
  
  // Manejar solicitudes DELETE (eliminar una foto por ID)
  export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    return handleDeleteFoto(req, params.id);
  }
  