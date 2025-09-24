export interface UploadResult {
  url: string
  deleteUrl?: string
  publicId?: string 
}

export interface ImageProvider {
  uploadImage: (buffer: Buffer, filename: string) => Promise<UploadResult>
  deleteImage?: (publicIdOrUrl: string) => Promise<void>
}
