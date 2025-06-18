import { PrismaClient } from "@prisma/client";
import { CalificacionData } from "../models/calificacionTypes";

const prisma = new PrismaClient();

export async function getAllCalificaciones() {
  return prisma.calificacion.findMany();
}

export async function createCalificacion(calificacionData: CalificacionData) {
  return prisma.calificacion.create({
    data: calificacionData,
  });
}

export async function getCalificacionById(id: number) {
  return prisma.calificacion.findUnique({
    where: { id },
  });
}

export async function deleteCalificacion(id: number) {
  return prisma.calificacion.delete({
    where: { id },
  });
}

export async function getCalificacionByAcuerdoAndCalificador(acuerdoId: number, calificadorId: number) {
  return await prisma.calificacion.findFirst({
    where: {
      acuerdoId,
      calificadorId,
    },
  });
}