export type UsuarioEstado = "ADMIN" | "INQUILINO" | "OFERENTE";

export interface UsuarioData {
    email: string;
    nombre: string;
    rol: UsuarioEstado;
    sitioWeb: string;
    imagenLogo: string;
    esInmobiliaria: boolean;
    cuit: number;
    localidad: string;
}

// Datos mínimos para crear un usuario
export interface UsuarioCreateData {
  email: string;
  nombre: string;
}

// Datos para actualizar un usuario (todos opcionales)
export type UsuarioUpdateData = Partial<UsuarioData>;
