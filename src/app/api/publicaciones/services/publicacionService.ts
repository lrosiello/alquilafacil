import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllPublicaciones() {
  return prisma.publicacion.findMany();
}

export async function createPublicacion(data: {
  titulo: string;
  descripcion: string;
  precio: number;
  direccion: string;
  localidad: string;
  estado: "DISPONIBLE" | "ALQUILADO";
  oferenteId: number;
}) {
  return prisma.publicacion.create({
    data,
  });
}

// Obtener publicación por ID
export async function getPublicacionById(id: number) {
    try {
      return await prisma.publicacion.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("Error al obtener la publicación:", error);
      throw new Error("Error al obtener la publicación");
    }
  }
  
  // Actualizar publicación por ID
  export async function updatePublicacion(id: number, data: {
    titulo: string;
    descripcion: string;
    precio: number;
    direccion: string;
    localidad: string;
    estado: "DISPONIBLE" | "ALQUILADO";
    oferenteId: number;
  }) {
    try {
      return await prisma.publicacion.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
      throw new Error("Error al actualizar la publicación");
    }
  }
  
  // Eliminar publicación por ID
  export async function deletePublicacion(id: number) {
    try {
      return await prisma.publicacion.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      throw new Error("Error al eliminar la publicación");
    }
  }