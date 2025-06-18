import * as calificacionRepository from "../repositories/calificacionRepository";
import { CalificacionData } from "../models/calificacionTypes";
import validating from "./calificacionValidations";
import * as acuerdoService from "../services/acuerdoAlquilerService";

export async function getAllCalificaciones() {
  return await calificacionRepository.getAllCalificaciones();
}

export async function createCalificacion(calificacionData: CalificacionData) {
  const { calificadorId, calificadoId, puntuacion, comentario, acuerdoId } =
    calificacionData;

  if (
    !calificadorId ||
    !calificadoId ||
    !puntuacion ||
    !comentario ||
    !acuerdoId
  ) {
    throw new Error("Todos los campos son obligatorios");
  }

  //REVISAR PARA LA PROXIMA
  const validation = await validating(
    calificadorId,
    calificadoId,
    puntuacion,
    acuerdoId
  );

  if (!validation.valid) {
    throw new Error(validation.message);
  }

  const acuerdo = await acuerdoService.getAcuerdoById(acuerdoId);
  if (!acuerdo) {
    throw new Error("El acuerdo especificado no existe.");
  }

  return await calificacionRepository.createCalificacion(calificacionData);
}



export async function getCalificacionById(id: number) {
  const calificacion = await calificacionRepository.getCalificacionById(id);
  if (!calificacion) {
    throw new Error("Calificacion no encontrada");
  }
  return calificacion;
}

export async function deleteCalificacion(id: number) {
  const calificacionExistente =
    await calificacionRepository.getCalificacionById(id);
  if (!calificacionExistente) {
    throw new Error("No se encontro la calificacion a eliminar");
  }

  return await calificacionRepository.deleteCalificacion(id);
}
