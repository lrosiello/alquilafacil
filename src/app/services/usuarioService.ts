import * as usuarioRepository from "../repositories/usuarioRepository";
import { UsuarioData, UsuarioUpdateData } from "../models/usuarioTypes";
import validating from "./usuarioValidations"; // (ajusté path porque no debería estar en controller)

export async function getAllUsuarios() {
  return await usuarioRepository.getAllUsuarios();
}

export async function createUsuario(usuarioData: UsuarioData) {
  const { email, nombre } = usuarioData;

  if (!email || !nombre) {
    throw new Error("Todos los campos son obligatorios");
  }
  return await usuarioRepository.createUsuario(usuarioData);
}

export async function getUsuarioById(id: number) {
  const usuario = await usuarioRepository.getUsuarioById(id);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }
  return usuario;
}

export async function updateUsuario(
  id: number,
  usuarioData: UsuarioUpdateData,
  completarCuenta: boolean = false
) {
  const usuarioExistente = await usuarioRepository.getUsuarioById(id);
  if (!usuarioExistente) {
    throw new Error("Este usuario no existe como para actualizar");
  }

  // MODO COMPLETAR DATOS DE USUARIO EN LA NUEVA CUENTA
  if (completarCuenta) {
    // Primera actualización de datos críticos (ROL, INMOBILIARIA, LOCALIDAD)
    const { rol, esInmobiliaria, localidad } = usuarioData;

    if (!rol || esInmobiliaria === undefined || !localidad) {
      throw new Error("Debe completar rol, localidad y si es inmobiliaria.");
    }

    // No permitir completar si ya fue completado antes
    if (
      usuarioExistente.rol !== null ||
      usuarioExistente.esInmobiliaria !== null
    ) {
      throw new Error("La cuenta ya fue completada previamente.");
    }

    const validation = validating(rol, esInmobiliaria);
    if (!validation.valid) {
      throw new Error(validation.message);
    }
  } else {
    // Actualización normal, SIN permitir cambiar rol, ni esInmobiliaria ni email, ni nombre
    if (
      usuarioData.rol ||
      usuarioData.esInmobiliaria !== undefined ||
      usuarioData.email ||
      usuarioData.nombre
    ) {
      throw new Error(
        "No se puede modificar el rol, ni si es inmobiliaria una vez finalizado el registro."
      );
    }
  }

  //Actualizacion de campos exclusivos de las inmobiliaras.
  const camposSoloInmobiliaria = ["cuit", "sitioWeb", "imagenLogo"];
  const camposInvalidos = camposSoloInmobiliaria.filter(
    (campo) => usuarioData[campo as keyof UsuarioUpdateData] !== undefined
  );
  if (camposInvalidos.length > 0 && !usuarioExistente.esInmobiliaria) {
    throw new Error(
      `Los campos ${camposInvalidos.join(
        ", "
      )} solo pueden ser completados por usuarios inmobiliarios.`
    );
  }
  return await usuarioRepository.updateUsuario(id, usuarioData);
}

export async function deleteUsuario(id: number) {
  const usuarioExistente = await usuarioRepository.getUsuarioById(id);
  if (!usuarioExistente) {
    throw new Error("No se encontro usuario a eliminar");
  }

  return await usuarioRepository.deleteUsuario(id);
}
