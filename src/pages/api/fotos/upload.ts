import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable-serverless";
import fs from "fs";
import imageProvider from "@/lib/imageProviders";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Error al parsear el formulario" });

   const fileField = files.image;
const file = (Array.isArray(fileField) ? fileField[0] : fileField) as unknown as { path: string; originalFilename?: string };

    if (!file || !file.path) {
      return res.status(400).json({ error: "No se recibió archivo válido" });
    }

    const buffer = fs.readFileSync(file.path);
    try {
      const { url, deleteUrl, publicId } = await imageProvider.uploadImage(
        buffer,
        file.originalFilename || "imagen"
      );

      // Guardar en tu backend
      const fotoRes = await axios.post("http://localhost:3000/api/fotos", {
        url,
        deleteUrl,
        publicacionId: 1,
        publicId,
      });

      return res.status(200).json({ url, fotoId: fotoRes.data.id });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Error al subir imagen" });
    }
  });
}
