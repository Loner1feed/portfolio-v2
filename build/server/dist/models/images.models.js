"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_conn_1 = __importDefault(require("../db/cloudinary.conn"));
const uploadImage = async (imageData) => {
    const { bytes, fileName } = imageData;
    try {
        const result = await cloudinary_conn_1.default.uploader.upload(bytes, {
            public_id: fileName,
        });
        if (result)
            return {
                imageUrl: result.secure_url,
                imagePublicId: result.public_id,
            };
        else
            return { imageUrl: null, imagePublicId: null };
    }
    catch (error) {
        console.log("IMAGE_UPLOAD_ERROR!!!!!!", error);
        return { imageUrl: null, imagePublicId: null };
    }
};
exports.uploadImage = uploadImage;
