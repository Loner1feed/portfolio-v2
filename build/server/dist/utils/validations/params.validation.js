"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.paramsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.paramsSchema = joi_1.default.object({
    page: joi_1.default.number().required(),
    pageSize: joi_1.default.number().required(),
    paramName: joi_1.default.string().allow(""),
    paramValue: joi_1.default.required(),
});
const validateParams = (req, res, next) => {
    const result = exports.paramsSchema.validate(req.body, {
        abortEarly: true,
    });
    if (result.error)
        res.status(400).json(result.error.details.map((err) => err.message));
    else
        next();
};
exports.validateParams = validateParams;
