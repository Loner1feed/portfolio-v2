import Joi, { ValidationError, ValidationResult } from "joi";
import { NextFunction, Request, Response } from "express";

export const itemSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  websiteUrl: Joi.string().allow(""),
  repoUrl: Joi.string().allow(""),
  stack: Joi.array().items(Joi.string()).required(),
  // stack: Joi.string().required(),
  isSimple: Joi.boolean().required(),
  imagePublicId: Joi.string(),
  imageUrl: Joi.string(),
});

export const validateItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: ValidationResult = itemSchema.validate(JSON.parse(req.body), {
    abortEarly: true,
  });

  if (result.error)
    res.status(400).json(result.error.details.map((err) => err.message));
  else next();
};

export const validateEditItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: ValidationResult = itemSchema.validate(
    JSON.parse(req.body.data),
    {
      abortEarly: true,
    }
  );

  if (result.error)
    res.status(400).json(result.error.details.map((err) => err.message));
  else next();
};
