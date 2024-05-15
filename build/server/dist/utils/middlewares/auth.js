"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../helpers/errorHandler");
const checkAuth = async (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log("token: ", token);
    console.log("secret: ", process.env.JWT_SECRET);
    if (!token)
        res.status(401).send('Access denied');
    else {
        try {
            // @ts-ignore
            const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            console.log("varified: ", verified);
            if (!verified)
                res.status(401).send('Access denied');
            else
                next();
        }
        catch (error) {
            (0, errorHandler_1.errorHandler)(error);
            res.status(500).send('Access denied');
        }
    }
};
exports.checkAuth = checkAuth;
