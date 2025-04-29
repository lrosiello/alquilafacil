import {
    handleGetUsuarioById,
    handleUpdateUsuario,
    handleDeleteUsuario,
  } from "../../../controllers/usuarioController";
  
  // Manejar solicitudes GET (obtener un usuario por ID)
  export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    return handleGetUsuarioById(req, params.id);
  }
  
  // Manejar solicitudes PUT (actualizar un usuario por ID)
  export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    return handleUpdateUsuario(req, params.id);
  }
  
  // Manejar solicitudes DELETE (eliminar un usuario por ID)
  export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    return handleDeleteUsuario(req, params.id);
  }
  