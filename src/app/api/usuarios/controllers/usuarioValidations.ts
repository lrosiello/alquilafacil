export default function validating(email: string, rol: string, esInmobiliaria: boolean) {

    let valid = true;
    let message = '';

    // Validacion del rol
    const validRoles = ["INQUILINO", "OFERENTE", "ADMIN"];
    if (!validRoles.includes(rol)) {
        valid = false;
        message += " El rol debe ser uno de los siguientes: INQUILINO, OFERENTE o ADMIN. ";
    }

    // Validacion del email usando una expresión regular
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        valid = false;
        message += " El email no tiene un formato válido. ";
    }

    // Validacion de esInmobiliaria (debe ser un valor booleano)
    if (typeof esInmobiliaria !== "boolean") {
        valid = false;
        message += " El valor de esInmobiliaria debe ser un booleano (true o false). ";
    }

    // Si todas las validaciones son correctas, retornamos true
    if (valid) {
        return { valid: true, message: "Los datos son válidos." };
    }

    // Si alguna validacion falla, retornamos false con el mensaje de error
    return { valid: false, message };
}
