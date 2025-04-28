import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllUsuarios() {
  return prisma.usuario.findMany();
}

export async function getUsuarioByEmail(email: string) {
  try {
    const user = await prisma.usuario.findUnique({
      where: { email },
    });
    return user; // Devuelve el usuario encontrado (o null si no se encuentra)
  } catch (error) {
    console.error("Error al buscar el usuario por email:", error);
    throw new Error("Error al buscar el usuario por email");
  }
}

export async function createUsuario(data: {
  email: string;
  password: string;
  nombre: string;
  rol: "ADMIN" | "INQUILINO" | "OFERENTE";
  localidad: string;
  esInmobiliaria: boolean;
}) {
  return prisma.usuario.create({
    data,
  });
}
