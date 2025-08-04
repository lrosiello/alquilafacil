import { prisma } from "../../lib/prisma";
import { FotoData } from "../models/fotoTypes";

export async function getAllFotos() {
  return prisma.foto.findMany();
}

export async function createFoto(fotoData: FotoData) {
  return prisma.foto.create({
    data: {
      url: fotoData.url,
      publicacionId: fotoData.publicacionId,
    },
  });
}

export async function getFotoById(id: number) {
  return prisma.foto.findUnique({
    where: { id },
  });
}

export async function deleteFoto(id: number) {
  return prisma.foto.delete({
    where: { id },
  });
}
