import { handleGetPublicaciones, handleCreatePublicacion} from "../../controllers/publicacionController";

export async function GET() {
  return handleGetPublicaciones();
}

export async function POST(req: Request) {
  return handleCreatePublicacion(req);
}