import express from "express";
import { createUserController, loginController } from "../controllers/users.controllers";
import { validateUser } from "../utils/validations/user.validation";
import { checkAuth } from "../utils/middlewares/auth";

const router = express.Router();

router.use(express.json());

router.post("/register", [validateUser, checkAuth], createUserController);

router.post("/login", validateUser, loginController);

export default router;