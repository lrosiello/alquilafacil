import { PrismaClient } from "@prisma/client";
import { FotoData } from "../models/fotoTypes";

const prisma = new PrismaClient();

export async function getAllFotos() {
  return prisma.foto.findMany();
}

export async function createFoto(fotoData: FotoData) {
  return prisma.foto.create({
    data: fotoData,
  });
}

export async function getFotoById(id: number) {
  return prisma.foto.findUnique({
    where: { id },
  });
}

export async function updateFoto(id: number, fotoData: FotoData) {
  return prisma.foto.update({
    where: { id },
    data: fotoData,
  });
}

export async function deleteFoto(id: number) {
  return prisma.foto.delete({
    where: { id },
  });
}
