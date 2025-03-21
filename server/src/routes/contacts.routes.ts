import express from "express";
import {
  getContactsController,
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsWithParamsController,
  updateContactController,
} from "../controllers/contacts.controllers";
import { validateParams } from "../utils/validations/params.validation";
import { validateContact } from "../utils/validations/contacts.validation";

const router = express.Router();

router.use(express.json());

// get all contacts
router.get("/", getContactsController);

// get contact by id
router.get("/:id/", getContactByIdController);

// get contacts by params
router.post("/", [validateParams], getContactsWithParamsController);

// create contact
router.post("/create", [validateContact], createContactController);

// update contact
router.put("/:id/", [validateContact], updateContactController);

// delete contact
router.delete("/:id/", deleteContactController);

export default router;
