import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable-serverless";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface UploadedFile {
  path: string;
  name?: string;
}

interface Files {
  image: UploadedFile[] | UploadedFile;
  [key: string]: UploadedFile[] | UploadedFile;
}

interface Fields {
  [key: string]: string | string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const form = new IncomingForm();

  form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
    if (err)
      return res.status(500).json({ error: "Error al parsear el formulario" });

    const fileField = files.image;
    const file = Array.isArray(fileField) ? fileField[0] : fileField;

    if (!file || !file.path) {
      return res.status(400).json({ error: "No se recibió archivo válido" });
    }

    const formData = new FormData();
    formData.append("image", fs.readFileSync(file.path), {
      filename: file.name,
    });

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=19fe848b57d55f11029133d52c4ffc2d`,
        formData,
        { headers: formData.getHeaders() }
      );

      const { url } = response.data.data;

      // Guarda la foto en la base de datos y obtén el objeto creado
      const fotoRes = await axios.post(
        "http://localhost:3000/api/fotos",
        {
          url,
          publicacionId: 1, // o el id que corresponda
        },
        { headers: { "Content-Type": "application/json" } }
      );

      // Devuelve también el id de la foto
      return res.status(200).json({ url, fotoId: fotoRes.data.id });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Error al subir imagen" });
    }
  });
}
