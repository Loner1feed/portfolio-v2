import { NextFunction, Request, Response } from "express";
import Joi, { ValidationResult } from "joi";

export const socialSchema = Joi.object({
  href: Joi.string().required(),
  name: Joi.string().required(),
  iconName: Joi.string().required(),
});

export const validateSocial = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: ValidationResult = socialSchema.validate(req.body, {
    abortEarly: true,
  });

  if (result.error)
    res.status(400).json(result.error.details.map((err) => err.message));
  else next();
};
