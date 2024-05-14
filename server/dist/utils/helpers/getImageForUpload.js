"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageForUpload = void 0;
const parser_1 = __importDefault(require("datauri/parser"));
const path_1 = __importDefault(require("path"));
const parser = new parser_1.default();
const getImageForUpload = (file) => {
    if (file) {
        const fileName = file.filename;
        const extName = path_1.default.extname(file.originalname).toString();
        const file64 = parser.format(extName, file.buffer).content;
        return { bytes: file64, fileName };
    }
    else
        return null;
};
exports.getImageForUpload = getImageForUpload;
