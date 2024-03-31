import Joi, { ValidationError, ValidationResult } from 'joi';
import { NextFunction, Request, Response } from 'express';

export const itemSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  websiteUrl: Joi.string().required(),
  repoUrl: Joi.string().required(),
  stack: Joi.array().required(),
  isSimple: Joi.boolean().required()
});

export const validateItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: ValidationResult = itemSchema.validate(req.body, { abortEarly: true });

  if (result.error) res.status(400).json(result.error.details.map((err) => err.message));
  else next();
}