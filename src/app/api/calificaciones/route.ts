import { handleGetCalificaciones, handleCreateCalificacion} from "../../controllers/calificacionController";

export async function GET() {
  return handleGetCalificaciones();
}

export async function POST(req: Request) {
  return handleCreateCalificacion(req);
}