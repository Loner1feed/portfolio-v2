import { Router } from "express";
import itemsRouter from "./items.routes";
import usersRouter from "./users.routes";
import imagesRouter from "./images.routes";

const router = Router();

// mount routes here 👇
router.use("/items", itemsRouter);
router.use("/auth", usersRouter);
router.use("/image", imagesRouter);

export default router;
