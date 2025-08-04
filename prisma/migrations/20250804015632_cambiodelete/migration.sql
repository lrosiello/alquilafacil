/*
  Warnings:

  - You are about to drop the column `deleteUrl` on the `Foto` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Foto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "publicacionId" INTEGER NOT NULL,
    CONSTRAINT "Foto_publicacionId_fkey" FOREIGN KEY ("publicacionId") REFERENCES "Publicacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Foto" ("id", "publicacionId", "url") SELECT "id", "publicacionId", "url" FROM "Foto";
DROP TABLE "Foto";
ALTER TABLE "new_Foto" RENAME TO "Foto";
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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
