import cloudinary from "../db/cloudinary.conn";
import { ImageData } from "./items.models";

export const uploadImage = async (imageData: ImageData) => {
  const { bytes, fileName } = imageData;

  try {
    const result = await cloudinary.uploader.upload(bytes, {
      public_id: fileName,
    });

    if (result)
      return {
        imageUrl: result.secure_url,
        imagePublicId: result.public_id,
      } as { imageUrl: string; imagePublicId: string };
    else return { imageUrl: null, imagePublicId: null };
  } catch (error) {
    console.log("IMAGE_UPLOAD_ERROR!!!!!!", error);
    return { imageUrl: null, imagePublicId: null };
  }
};
