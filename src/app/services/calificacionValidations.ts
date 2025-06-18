import * as usuarioRepository from "../repositories/usuarioRepository";
import * as acuerdoAlquilerRepository from "../repositories/acuerdoAlquilerRepository";
import * as calificacionRepository from "../repositories/calificacionRepository";

export default async function validating(
  calificadorId: number,
  calificadoId: number,
  puntuacion: number,
  acuerdoId?: number //REVISAR PARA LA PROXIMA
) {
  let valid = true;
  let message = "";

  // Verificar existencia calificador
  const calificadorExiste = await usuarioRepository.getUsuarioById(
    calificadorId
  );
  if (!calificadorExiste) {
    throw new Error("El calificador no existe");
  }

  // Verificar existencia calificado
  const calificadoExiste = await usuarioRepository.getUsuarioById(calificadoId);
  if (!calificadoExiste) {
    throw new Error("El calificado no existe");
  }

// Verificar existencia del acuerdo
  if (acuerdoId) {
    const acuerdoExiste = await acuerdoAlquilerRepository.getAcuerdoById(acuerdoId);
    if (!acuerdoExiste) {
      throw new Error("No hay un acuerdo relacionado existente");
    }

    // Verificar que no haya una calificación previa del mismo calificador en este acuerdo
    const calificacionExistente = await calificacionRepository.getCalificacionByAcuerdoAndCalificador(
      acuerdoId,
      calificadorId
    );
    if (calificacionExistente) {
      return {
        valid: false,
        message: "Ya realizaste una calificación para este acuerdo.",
      };
    }
  }

  // Validación de puntuacion
  if (typeof puntuacion !== "number" || isNaN(puntuacion)) {
    valid = false;
    message += " La puntuacion debe ser ingresada con valor numerico ";
  }

  // Verificar que los valores ingresados sean entre 1 y 5
  if (puntuacion < 1 || puntuacion > 5 ) {
    valid = false;
    message += " Ingresar un numero del 1 al 5, ni mas ni menos ";
  }

  // Si todas las validaciones son correctas, retornamos true
  if (valid) {
    return { valid: true, message: "Los datos son válidos." };
  }

  // Si alguna validacion falla, retornamos false con el mensaje de error
  return { valid: false, message };
}
