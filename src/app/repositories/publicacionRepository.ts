import { PrismaClient } from "@prisma/client";
import { PublicacionData } from "../models/publicacionTypes";

const prisma = new PrismaClient();

export async function getAllPublicaciones() {
  return prisma.publicacion.findMany();
}

export async function createPublicacion(publicacionData: PublicacionData) {
  return prisma.publicacion.create({
    data: publicacionData,
  });
}

export async function getPublicacionById(id: number) {
  return prisma.publicacion.findUnique({
    where: { id },
  });
}

export async function updatePublicacion(id: number, publicacionData: PublicacionData) {
  return prisma.publicacion.update({
    where: { id },
    data: publicacionData,
  });
}

export async function deletePublicacion(id: number) {
  return prisma.publicacion.delete({
    where: { id },
  });
}
