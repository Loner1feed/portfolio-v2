"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = exports.loginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_models_1 = require("../models/users.models");
const errorHandler_1 = require("../utils/helpers/errorHandler");
const loginController = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await (0, users_models_1.getUser)(username);
        if (!user)
            res.status(404).send("User not found!");
        else {
            const passwordMatch = await bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch)
                res.status(401).send("Incorrect password!");
            else {
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, 
                // @ts-ignore
                process.env.JWT_SECRET);
                res.status(201).send({ token });
            }
        }
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error);
        res.status(500).send("Server error!");
    }
};
exports.loginController = loginController;
const createUserController = async (req, res) => {
    const data = req.body;
    try {
        const response = await (0, users_models_1.createUser)(data);
        if (response.acknowledged)
            res.status(200).send(response.insertedId);
    }
    catch (error) {
        res.status(500).send("Server error");
        (0, errorHandler_1.errorHandler)(error);
    }
};
exports.createUserController = createUserController;
