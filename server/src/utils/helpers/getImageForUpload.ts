import DatauriParser from "datauri/parser";
import path from "path";
const parser = new DatauriParser();

export const getImageForUpload = (file: Express.Multer.File) => {
  if (file) {
    const fileName = file.filename;
    const extName = path.extname(file.originalname).toString();
    const file64 = parser.format(extName, file.buffer).content as string;

    return { bytes: file64, fileName };
  } else return null;
};
