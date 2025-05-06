import * as publicacionRepository from "../repositories/publicacionRepository";
import { PublicacionData } from "../models/publicacionTypes";
import validating from "./publicacionValidations"; // (ajusté path porque no debería estar en controller)

export async function getAllPublicaciones() {
  return await publicacionRepository.getAllPublicaciones();
}

export async function createPublicacion(publicacionData: PublicacionData) {
  const {
    titulo,
    descripcion,
    precio,
    direccion,
    localidad,
    estado,
    oferenteId,
  } = publicacionData;

  if (
    !titulo ||
    !descripcion ||
    !precio ||
    !direccion ||
    !localidad ||
    !estado ||
    !oferenteId
  ) {
    throw new Error("Todos los campos son obligatorios");
  }



  const validation = await validating(precio, estado , oferenteId);
  if (!validation.valid) {
    throw new Error(validation.message);
  }

  return await publicacionRepository.createPublicacion(publicacionData);
}

export async function getPublicacionById(id: number) {
  const publicacion = await publicacionRepository.getPublicacionById(id);
  if (!publicacion) {
    throw new Error("Publicacion no encontrada");
  }
  return publicacion;
}

export async function updatePublicacion(
  id: number,
  publicacionData: PublicacionData
) {
  const publicacionExistente = await publicacionRepository.getPublicacionById(
    id
  );
  if (!publicacionExistente) {
    throw new Error("Esta publicacion no existe como para actualizar");
  }

  const {
    titulo,
    descripcion,
    precio,
    direccion,
    localidad,
    estado,
    oferenteId,
  } = publicacionData;

  //verificando existencia de campos
  if (
    !titulo ||
    !descripcion ||
    !precio ||
    !direccion ||
    !localidad ||
    !estado ||
    !oferenteId
  ) {
    throw new Error("Todos los campos son obligatorios");
  }


  //Verificando campos
  const validation = await validating(precio, estado, oferenteId);
  if (!validation.valid) {
    throw new Error(validation.message);
  }

  return await publicacionRepository.updatePublicacion(id, publicacionData);
}

export async function deletePublicacion(id: number) {
  const publicacionExistente = await publicacionRepository.getPublicacionById(
    id
  );
  if (!publicacionExistente) {
    throw new Error("No se encontro la publicacion a eliminar");
  }

  return await publicacionRepository.deletePublicacion(id);
}
