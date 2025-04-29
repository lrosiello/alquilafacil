import { PrismaClient } from "@prisma/client";
import { UsuarioData, UsuarioUpdateData } from "../models/usuarioTypes";

const prisma = new PrismaClient();

export async function getAllUsuarios() {
  return prisma.usuario.findMany();
}

export async function createUsuario(usuarioData: UsuarioData) {
  return prisma.usuario.create({
    data: usuarioData,
  });
}

export async function getUsuarioById(id: number) {
  return prisma.usuario.findUnique({
    where: { id },
  });
}

export async function updateUsuario(id: number, usuarioData: UsuarioUpdateData) {
  return prisma.usuario.update({
    where: { id },
    data: usuarioData,
  });
}

export async function deleteUsuario(id: number) {
  return prisma.usuario.delete({
    where: { id },
  });
}
