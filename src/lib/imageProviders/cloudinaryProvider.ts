import cloudinaryProvider from "./cloudinaryProvider";
import imgbbProvider from "./imgbbProvider";
import type { ImageProvider } from "./types";

// Podés cambiar la fuente desde un .env
const providerName = process.env.IMAGE_PROVIDER || "cloudinary";

let provider: ImageProvider;

switch (providerName) {
  case "imgbb":
    provider = imgbbProvider;
    break;
  case "cloudinary":
    provider = cloudinaryProvider;
    break;
  default:
    throw new Error(`Proveedor de imagenes no soportado: ${providerName}`);
}

export default provider;
