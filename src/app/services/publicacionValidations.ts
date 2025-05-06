import * as usuarioRepository from "../repositories/usuarioRepository";

export default async function validating(precio: number, estado: string, oferenteId: number) {
  let valid = true;
  let message = "";

  // Validacion del estado
  const validStatus = ["DISPONIBLE", "ALQUILADO"];
  if (!validStatus.includes(estado)) {
    valid = false;
    message += " El estado solo puede ser DISPONIBLE O ALQUILADO ";
  }

  // Validación del precio: debe ser un número
  if (typeof precio !== "number" || isNaN(precio)) {
    valid = false;
    message += " El precio debe ser un número válido. ";
  }

  // Validacion de valor del precio
  if (precio <= 0) {
    valid = false;
    message += " El precio debe ser mayor a 0. ";
  }

  // Verificar si existe el oferente
  const oferenteExiste = await usuarioRepository.getUsuarioById(oferenteId);
  if (!oferenteExiste) {
    valid = false;
    message += " El oferente indicado no existe. ";
  }

  // Si todas las validaciones son correctas, retornamos true
  if (valid) {
    return { valid: true, message: "Los datos son válidos." };
  }

  // Si alguna validacion falla, retornamos false con el mensaje de error
  return { valid: false, message };
}


