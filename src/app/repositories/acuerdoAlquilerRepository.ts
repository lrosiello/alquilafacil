import { PrismaClient } from "@prisma/client";
import { AcuerdoAlquilerData } from "../models/acuerdoAlquilerTypes";

const prisma = new PrismaClient();

export async function getAllAcuerdos() {
  return prisma.acuerdoAlquiler.findMany();
}

export async function createAcuerdo(acuerdoAlquilerData: AcuerdoAlquilerData) {
  return prisma.acuerdoAlquiler.create({
    data: acuerdoAlquilerData,
  });
}

export async function getAcuerdoById(id: number) {
  return prisma.acuerdoAlquiler.findUnique({
    where: { id },
  });
}

export async function deleteAcuerdo(id: number) {
  return prisma.publicacion.delete({
    where: { id },
  });
}


