import * as fotoRepository from "../repositories/fotoRepository";
import { FotoData } from "../models/fotoTypes";

export async function getAllFotos() {
  return await fotoRepository.getAllFotos();
}




export async function createFoto(fotoData: FotoData) {
  const {
    url,
    publicacionId,
  } = fotoData;

  if (
    !url ||
    !publicacionId
  ) {
    throw new Error("Todos los campos son obligatorios");
  }

  return await fotoRepository.createFoto(fotoData);
}





export async function getFotoById(id: number) {
  const foto = await fotoRepository.getFotoById(id);
  if (!foto) {
    throw new Error("Foto no encontrada");
  }
  return foto;
}






export async function updateFoto(
  id: number,
  fotoData: FotoData
) {
  const fotoExistente = await fotoRepository.getFotoById(
    id
  );
  if (!fotoExistente) {
    throw new Error("Esta foto no existe para actualizar");
  }

  const {
    url,
    publicacionId
  } = fotoData;

  if (
    !url ||
    !publicacionId
  ) {
    throw new Error("Todos los campos son obligatorios");
  }

  return await fotoRepository.updateFoto(id, fotoData);
}






export async function deleteFoto(id: number) {
  const fotoExistente = await fotoRepository.getFotoById(
    id
  );
  if (!fotoExistente) {
    throw new Error("No se encontro la foto a eliminar");
  }

  return await fotoRepository.deleteFoto(id);
}
