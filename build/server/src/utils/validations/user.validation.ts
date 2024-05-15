import Joi, { ValidationError, ValidationResult } from 'joi';
import { NextFunction, Request, Response } from 'express';

const UserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required()
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: ValidationResult = UserSchema.validate(req.body, { abortEarly: true });

  if (result.error) res.status(400).json(result.error.details.map((err) => err.message));
  else next();
}