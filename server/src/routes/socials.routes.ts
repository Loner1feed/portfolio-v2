import express from "express";
import {
  createSocialsController,
  deleteSocialsController,
  getSocialByIdController,
  getSocialsController,
  getSocialsWithParamsController,
  updateSocialsController,
} from "../controllers/socials.controllers";
import { validateSocial } from "../utils/validations/socials.validation";
import { validateParams } from "../utils/validations/params.validation";

const router = express.Router();

router.use(express.json());

// get all socials
router.get("/", getSocialsController);

// get social by id
router.get("/:id/", getSocialByIdController);

// get socials by params
router.post("/", [validateParams], getSocialsWithParamsController);

// create social
router.post("/create", [validateSocial], createSocialsController);

// update social
router.put("/:id/", [validateSocial], updateSocialsController);

// delete social
router.delete("/:id/", deleteSocialsController);

export default router;
