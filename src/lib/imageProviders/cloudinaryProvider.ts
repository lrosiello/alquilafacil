import { v2 as cloudinary } from "cloudinary";
import { ImageProvider, UploadResult } from "./types";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const cloudinaryProvider: ImageProvider = {
  uploadImage: async (buffer: Buffer, filename: string): Promise<UploadResult> => {
    return await new Promise<UploadResult>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "mis-imagenes", public_id: filename }, (err, result) => {
          if (err || !result) return reject(err);
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        })
        .end(buffer);
    });
  },

  deleteImage: async (publicId: string) => {
    await cloudinary.uploader.destroy(publicId);
  },
};

export default cloudinaryProvider;