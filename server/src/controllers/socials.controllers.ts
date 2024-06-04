import { Request, Response } from "express";
import {
  Social,
  createSocial,
  deleteSocial,
  getSocialById,
  getSocials,
  getSocialsWithParams,
  updateSocial,
} from "../models/socials.models";
import { errorHandler } from "../utils/helpers/errorHandler";

export const getSocialsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const socials = await getSocials();
    res.status(200).json(socials);
  } catch (error) {
    errorHandler(error);
    console.log(error);
    res.status(500).send("Server error");
  }
};

export const getSocialByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;

    const social = await getSocialById(id);

    if (social) res.json(social);
    else res.status(404).send("Social not found");
  } catch (error) {
    errorHandler(error);
    res.status(500).send("Server error");
  }
};

export const createSocialsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  try {
    const response = await createSocial(req.body);

    if (response.acknowledged) res.status(200).send(response.insertedId);
    else res.status(500).send("Unable to create an social");
  } catch (error) {
    errorHandler(error);
    console.log(error);
    res.status(500).send("Server error");
  }
};

export const updateSocialsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const data = req.body;

  try {
    const response = await updateSocial(id, data);

    if (response.acknowledged)
      res.status(200).send("Social successfully updated!");
    else res.status(500).send("Unable to update an social");
  } catch (error) {
    res.status(500).send("error!");
    errorHandler(error);
  }
};

export const getSocialsWithParamsController = async (
  req: Request,
  res: Response
) => {
  try {
    const params = req.body;
    const response = await getSocialsWithParams(params);

    res.status(200).json(response);
  } catch (error) {
    // errorHandler(error);
    res.status(500).send("Server error");
  }
};

export const deleteSocialsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req?.params?.id;

  try {
    const isDeleted = await deleteSocial(id);

    if (isDeleted) res.status(200).send(`Deleted social with id: ${id}`);
    else res.status(404).send(`Can not find and delete social with id: ${id}`);
  } catch (error) {
    res.status(500).send("Server error");
    errorHandler(error);
  }
};
