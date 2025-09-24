import axios from "axios";
import FormData from "form-data";
import { ImageProvider, UploadResult } from "./types";

const IMGBB_API_KEY = process.env.IMGBB_API_KEY!;

const imgbbProvider: ImageProvider = {
  uploadImage: async (buffer: Buffer, filename: string): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append("image", buffer.toString("base64")); // imgbb espera base64
    formData.append("name", filename);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData,
      { headers: formData.getHeaders() }
    );

    return {
      url: response.data.data.url,
      deleteUrl: response.data.data.delete_url,
      publicId: response.data.data.id,
    };
  },

  deleteImage: async () => {
    // imgbb no soporta delete por API, puedes dejarlo vacío o lanzar un error
    throw new Error("imgbb no soporta eliminación por API");
  },
};

export default imgbbProvider;