"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("../controllers/users.controllers");
const user_validation_1 = require("../utils/validations/user.validation");
const auth_1 = require("../utils/middlewares/auth");
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post("/register", [user_validation_1.validateUser, auth_1.checkAuth], users_controllers_1.createUserController);
router.post("/login", user_validation_1.validateUser, users_controllers_1.loginController);
exports.default = router;
