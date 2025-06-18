import { handleGetFotos, handleCreateFoto} from "../../controllers/fotoController";

export async function GET() {
  return handleGetFotos();
}

export async function POST(req: Request) {
  return handleCreateFoto(req);
}