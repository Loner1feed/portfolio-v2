import express from "express";
import {
  createItemController,
  deleteItemByIdController,
  getFullItemsWithParamsController,
  getItemByIdController,
  getItemsController,
  getItemsWithParamsController,
  updateItemController,
} from "../controllers/items.controllers";
import { validateItem } from "../utils/validations/items.validation";
import { validateParams } from "../utils/validations/params.validation";
import { checkAuth } from "../utils/middlewares/auth";
import multer, { memoryStorage } from "multer";

const upload = multer({ storage: memoryStorage() });

export const router = express.Router();

router.use(express.json());

// get item by id
router.get("/single", getItemByIdController);

// get all items
router.get("/", getItemsController);

// get items by params and page
router.post("/", validateParams, getItemsWithParamsController);

// get items by params and page (for admin)
router.post(
  "/full",
  [checkAuth, validateParams],
  getFullItemsWithParamsController
);

// delete item by id
router.delete("/:id/", checkAuth, deleteItemByIdController);

// create item
router.post(
  "/create",
  [checkAuth, upload.single("image"), validateItem],
  createItemController
);

// update item by id
router.put(
  "/:id/",
  [checkAuth, upload.single("image"), validateItem],
  updateItemController
);

export default router;
