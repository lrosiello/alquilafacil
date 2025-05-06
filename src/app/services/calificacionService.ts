import * as calificacionRepository from "../repositories/calificacionRepository";
import { CalificacionData } from "../models/calificacionTypes";

export async function getAllCalificaciones() {
  return await calificacionRepository.getAllCalificaciones();
}




export async function createCalificacion(calificacionData: CalificacionData) {
  const {
    calificadorId,
    calificadoId,
    puntuacion,
    comentario,
    acuerdoId,
  } = calificacionData;

  if (
    !calificadorId ||
    !calificadoId ||
    !puntuacion ||
    !comentario ||
    !acuerdoId
  ) {
    throw new Error("Todos los campos son obligatorios");
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
  const calificacionExistente = await calificacionRepository.getCalificacionById(
    id
  );
  if (!calificacionExistente) {
    throw new Error("No se encontro la calificacion a eliminar");
  }

  return await calificacionRepository.deleteCalificacion(id);
}
