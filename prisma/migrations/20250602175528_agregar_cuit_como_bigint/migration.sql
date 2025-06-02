/*
  Warnings:

  - You are about to alter the column `cuit` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Publicacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "direccion" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "fechaExpiracion" DATETIME NOT NULL DEFAULT (datetime('now', '+60 days')),
    "estado" TEXT NOT NULL,
    "oferenteId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Publicacion_oferenteId_fkey" FOREIGN KEY ("oferenteId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Publicacion" ("createdAt", "descripcion", "direccion", "estado", "fechaExpiracion", "id", "localidad", "oferenteId", "precio", "titulo") SELECT "createdAt", "descripcion", "direccion", "estado", "fechaExpiracion", "id", "localidad", "oferenteId", "precio", "titulo" FROM "Publicacion";
DROP TABLE "Publicacion";
ALTER TABLE "new_Publicacion" RENAME TO "Publicacion";
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" TEXT,
    "sitioWeb" TEXT,
    "imagenLogo" TEXT,
    "esInmobiliaria" BOOLEAN,
    "cuit" BIGINT,
    "localidad" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Usuario" ("createdAt", "cuit", "email", "esInmobiliaria", "id", "imagenLogo", "localidad", "nombre", "rol", "sitioWeb") SELECT "createdAt", "cuit", "email", "esInmobiliaria", "id", "imagenLogo", "localidad", "nombre", "rol", "sitioWeb" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
