import express from 'express';
import {
  createItemController,
  deleteItemByIdController,
  getItemByIdController,
  getItemsController,
  getItemsWithParamsController,
  updateItemController
} from '../controllers/items.controllers';
import { validateItem } from '../utils/validations/items.validation';
import { validateParams } from '../utils/validations/params.validation';
import { checkAuth } from '../utils/middlewares/auth';

export const router = express.Router();

router.use(express.json());

// get all items
router.get("/", getItemsController);

// get item by id
router.get("/:id/", getItemByIdController);

// get items by params and page
router.post("/", validateParams, getItemsWithParamsController);

// delete item by id
router.delete("/:id/", checkAuth, deleteItemByIdController);

// create item
router.post("/create", [checkAuth, validateItem], createItemController);

// update item by id
router.put("/:id/", [checkAuth, validateItem], updateItemController);



export default router;
