import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errorHandler } from "../helpers/errorHandler";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("token: ", token);
  console.log("secret: ", process.env.JWT_SECRET);
  if (!token) res.status(401).send('Access denied');
  else {
    try {
      // @ts-ignore
      const verified = jwt.verify(token, process.env.JWT_SECRET);

      console.log("varified: ", verified);

      if (!verified) res.status(401).send('Access denied');
      else next();
    } catch (error) {
      errorHandler(error);
      res.status(500).send('Access denied');
    }
  }
}