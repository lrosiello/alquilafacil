/*
  Warnings:

  - Made the column `acuerdoId` on table `Calificacion` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calificacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "calificadorId" INTEGER NOT NULL,
    "calificadoId" INTEGER NOT NULL,
    "puntuacion" INTEGER NOT NULL,
    "comentario" TEXT,
    "acuerdoId" INTEGER NOT NULL,
    CONSTRAINT "Calificacion_calificadorId_fkey" FOREIGN KEY ("calificadorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Calificacion_calificadoId_fkey" FOREIGN KEY ("calificadoId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Calificacion_acuerdoId_fkey" FOREIGN KEY ("acuerdoId") REFERENCES "AcuerdoAlquiler" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Calificacion" ("acuerdoId", "calificadoId", "calificadorId", "comentario", "id", "puntuacion") SELECT "acuerdoId", "calificadoId", "calificadorId", "comentario", "id", "puntuacion" FROM "Calificacion";
DROP TABLE "Calificacion";
ALTER TABLE "new_Calificacion" RENAME TO "Calificacion";
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
