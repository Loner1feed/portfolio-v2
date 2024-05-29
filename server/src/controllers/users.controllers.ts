import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUser } from "../models/users.models";
import { errorHandler } from "../utils/helpers/errorHandler";

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await getUser(username);

    if (!user) res.status(404).send("User not found!");
    else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) res.status(402).send("Incorrect password!");
      else {
        const token = jwt.sign(
          {
            data: user.id,
          },
          // @ts-ignore
          process.env.JWT_SECRET,
          { expiresIn: 6 }
        );
        res.status(201).send({ token, expiresIn: 60 });
      }
    }
  } catch (error) {
    errorHandler(error);
    res.status(500).send("Server error!");
  }
};

export const createUserController = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const response = await createUser(data);

    if (response.acknowledged) res.status(200).send(response.insertedId);
  } catch (error) {
    res.status(500).send("Server error");
    errorHandler(error);
  }
};
