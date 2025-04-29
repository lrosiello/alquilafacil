export default function validating(precio: number, estado: string) {

    let valid = true;
    let message = '';

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

    // Si todas las validaciones son correctas, retornamos true
    if (valid) {
        return { valid: true, message: "Los datos son válidos." };
    }

    // Si alguna validacion falla, retornamos false con el mensaje de error
    return { valid: false, message };
}
