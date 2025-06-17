import * as acuerdoAlquilerRepository from "../repositories/acuerdoAlquilerRepository";
import { AcuerdoAlquilerData } from "../models/acuerdoAlquilerTypes";
import * as publicacionService from "../services/publicacionService";
import * as usuarioService from "../services/usuarioService";

export async function getAllAcuerdos() {
  return await acuerdoAlquilerRepository.getAllAcuerdos();
}

export async function createAcuerdo(acuerdoAlquilerData: AcuerdoAlquilerData) {
  const { publicacionId, inquilinoId, oferenteId } = acuerdoAlquilerData;

  if (!publicacionId || !inquilinoId || !oferenteId) {
    throw new Error("Todos los campos son obligatorios");
  }

  // Obtener datos de usuario
  const inquilino = await usuarioService.getUsuarioById(inquilinoId);
  const oferente = await usuarioService.getUsuarioById(oferenteId);

  // Actualizar publicación
  const publicacion = await publicacionService.getPublicacionById(
    publicacionId
  );
  // Verificacion de que la publicacion este o no alquilada
  if (publicacion.estado === "ALQUILADO") {
    throw new Error("La publicación ya se encuentra alquilada");
  }

  await publicacionService.updatePublicacion(publicacionId, {
    ...publicacion,
    estado: "ALQUILADO",
  });

  // Crear acuerdo con nombres y fecha actuales
  return await acuerdoAlquilerRepository.createAcuerdo({
    publicacionId,
    inquilinoId,
    nombreInquilino: inquilino.nombre,
    oferenteId,
    nombreOferente: oferente.nombre,
    fechaAcuerdo: new Date(),
  });
}

export async function getAcuerdoById(id: number) {
  const acuerdoAlquiler = await acuerdoAlquilerRepository.getAcuerdoById(id);
  if (!acuerdoAlquiler) {
    throw new Error("Acuerdo no encontrado");
  }
  return acuerdoAlquiler;
}

export async function deleteAcuerdo(id: number) {
  const acuerdoExistente = await acuerdoAlquilerRepository.getAcuerdoById(id);
  if (!acuerdoExistente) {
    throw new Error("No se encontro el acuerdo a eliminar");
  }

  return await acuerdoAlquilerRepository.deleteAcuerdo(id);
}
