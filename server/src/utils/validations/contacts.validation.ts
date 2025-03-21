import Joi, { ValidationError, ValidationResult } from "joi";
import { NextFunction, Request, Response } from "express";

export const contactSchema = Joi.object({
  href: Joi.string(),
  label: Joi.string().required(),
  body: Joi.string().required(),
});

export const validateContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: ValidationResult = contactSchema.validate(req.body, {
    abortEarly: true,
  });

  if (result.error)
    res.status(400).json(result.error.details.map((err) => err.message));
  else next();
};
