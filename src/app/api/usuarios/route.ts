import { handleGetUsuarios, handleCreateUsuario } from "./controllers/usuarioController";

export async function GET() {
  return handleGetUsuarios();
}

export async function POST(req: Request) {
  return handleCreateUsuario(req);
}