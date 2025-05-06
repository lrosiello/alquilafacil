import * as acuerdoAlquilerRepository from "../repositories/acuerdoAlquilerRepository";
import { AcuerdoAlquilerData } from "../models/acuerdoAlquilerTypes";

export async function getAllAcuerdos() {
  return await acuerdoAlquilerRepository.getAllAcuerdos();
}




export async function createAcuerdo(acuerdoAlquilerData : AcuerdoAlquilerData) {
  const {
    publicacionId,
    inquilinoId,
    nombreInquilino,
    oferenteId,
    nombreOferente,
    fechaAcuerdo,
  } = acuerdoAlquilerData;

  if (
    !publicacionId ||
    !inquilinoId ||
    !nombreInquilino ||
    !oferenteId ||
    !nombreOferente ||
    !fechaAcuerdo 
  ) {
    throw new Error("Todos los campos son obligatorios");
  }

  return await acuerdoAlquilerRepository.createAcuerdo(acuerdoAlquilerData);
}





export async function getAcuerdoById(id: number) {
  const acuerdoAlquiler = await acuerdoAlquilerRepository.getAcuerdoById(id);
  if (!acuerdoAlquiler) {
    throw new Error("Acuerdo no encontrado");
  }
  return acuerdoAlquiler;
}


