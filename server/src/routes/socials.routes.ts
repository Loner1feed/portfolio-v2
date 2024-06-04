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

router.get("/", getSocialsController);

router.get("/:id/", getSocialByIdController);

router.post("/", [validateParams], getSocialsWithParamsController);

router.post("/create", [validateSocial], createSocialsController);

router.put("/:id/", [validateSocial], updateSocialsController);

router.delete("/:id/", deleteSocialsController);

export default router;
