"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateItem = exports.itemSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.itemSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    websiteUrl: joi_1.default.string().required(),
    repoUrl: joi_1.default.string().required(),
    stack: joi_1.default.string().required(),
    isSimple: joi_1.default.boolean().required(),
    imagePublicId: joi_1.default.string(),
    imageUrl: joi_1.default.string(),
});
const validateItem = (req, res, next) => {
    const result = exports.itemSchema.validate(req.body, {
        abortEarly: true,
    });
    if (result.error)
        res.status(400).json(result.error.details.map((err) => err.message));
    else
        next();
};
exports.validateItem = validateItem;
