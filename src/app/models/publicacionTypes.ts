export type PublicacionEstado = "DISPONIBLE" | "ALQUILADO";

export interface PublicacionData {
  titulo: string;
  descripcion: string;
  precio: number;
  direccion: string;
  localidad: string;
  estado: PublicacionEstado;
  oferenteId: number;
}