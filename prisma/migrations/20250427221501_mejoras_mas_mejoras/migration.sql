/*
  Warnings:

  - You are about to drop the column `atencion` on the `Calificacion` table. All the data in the column will be lost.
  - You are about to drop the column `confiabilidad` on the `Calificacion` table. All the data in the column will be lost.
  - You are about to drop the column `precioCalidad` on the `Calificacion` table. All the data in the column will be lost.
  - Added the required column `puntuacion` to the `Calificacion` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AcuerdoAlquiler" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicacionId" INTEGER NOT NULL,
    "inquilinoId" INTEGER,
    "nombreInquilino" TEXT NOT NULL,
    "oferenteId" INTEGER,
    "nombreOferente" TEXT NOT NULL,
    "fechaAcuerdo" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AcuerdoAlquiler_publicacionId_fkey" FOREIGN KEY ("publicacionId") REFERENCES "Publicacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AcuerdoAlquiler_inquilinoId_fkey" FOREIGN KEY ("inquilinoId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AcuerdoAlquiler_oferenteId_fkey" FOREIGN KEY ("oferenteId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calificacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "calificadorId" INTEGER NOT NULL,
    "calificadoId" INTEGER NOT NULL,
    "puntuacion" INTEGER NOT NULL,
    "comentario" TEXT,
    "acuerdoId" INTEGER,
    CONSTRAINT "Calificacion_calificadorId_fkey" FOREIGN KEY ("calificadorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Calificacion_calificadoId_fkey" FOREIGN KEY ("calificadoId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Calificacion_acuerdoId_fkey" FOREIGN KEY ("acuerdoId") REFERENCES "AcuerdoAlquiler" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Calificacion" ("calificadoId", "calificadorId", "comentario", "id") SELECT "calificadoId", "calificadorId", "comentario", "id" FROM "Calificacion";
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

-- CreateIndex
CREATE UNIQUE INDEX "AcuerdoAlquiler_publicacionId_key" ON "AcuerdoAlquiler"("publicacionId");
