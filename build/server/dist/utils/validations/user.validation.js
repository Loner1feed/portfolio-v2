"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const UserSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().min(6).required()
});
const validateUser = (req, res, next) => {
    const result = UserSchema.validate(req.body, { abortEarly: true });
    if (result.error)
        res.status(400).json(result.error.details.map((err) => err.message));
    else
        next();
};
exports.validateUser = validateUser;
