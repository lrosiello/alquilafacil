import { handleGetAcuerdos, handleCreateAcuerdo} from "../../controllers/acuerdoAlquilerController";

export async function GET() {
  return handleGetAcuerdos();
}

export async function POST(req: Request) {
  return handleCreateAcuerdo(req);
}