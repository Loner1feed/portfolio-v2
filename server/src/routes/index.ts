import { Request, Response, Router } from "express";
import itemsRouter from "./items.routes";
import usersRouter from "./users.routes";
import imagesRouter from "./images.routes";
import socialsRouter from "./socials.routes";

const router = Router();

// default route to make sure server is alive
router.get("/", (req: Request, res: Response) => {
  res.status(200).send("I'm alive");
});

// mount routes here 👇
router.use("/items", itemsRouter);
router.use("/auth", usersRouter);
router.use("/image", imagesRouter);
router.use("/socials", socialsRouter);

export default router;
