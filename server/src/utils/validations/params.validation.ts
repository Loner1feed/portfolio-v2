import Joi, { ValidationError, ValidationResult } from 'joi';
import { NextFunction, Request, Response } from 'express';

export const paramsSchema = Joi.object({
  page: Joi.number().required(),
  pageSize: Joi.number().required(),
  paramName: Joi.string().required(),
  paramValue: Joi.required()
});

export const validateParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: ValidationResult = paramsSchema.validate(req.body, { abortEarly: true });

  if (result.error) res.status(400).json(result.error.details.map((err) => err.message));
  else next();
}