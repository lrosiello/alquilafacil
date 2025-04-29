export default function validating(rol?: string, esInmobiliaria?: boolean) {
    let valid = true;
    let message = '';
  
    // Validación del rol
    if (rol !== undefined && rol !== null) {
    const validRoles = ["INQUILINO", "OFERENTE", "ADMIN"];
    if (!validRoles.includes(rol)) {
      valid = false;
      message += " El rol debe ser uno de los siguientes: INQUILINO, OFERENTE o ADMIN. ";
    }

    }
   
  
    // Validación de esInmobiliaria (solo si está definido)
    if (esInmobiliaria !== undefined && typeof esInmobiliaria !== "boolean") {
      valid = false;
      message += " El valor de esInmobiliaria debe ser un booleano (true o false). ";
    }
  
    if (valid) {
      return { valid: true, message: "Los datos son válidos." };
    }
  
    return { valid: false, message };
  }
  