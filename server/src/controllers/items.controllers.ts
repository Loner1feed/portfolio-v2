import { Request, Response } from "express";
import {
  Item,
  getItems,
  getItemById,
  deleteItemById,
  createItem,
  updateItem,
  getItemsWithParams,
} from "../models/items.models";
import { errorHandler } from "../utils/helpers/errorHandler";
import { Params } from "../utils/types";

export const getItemsController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const items: Item[] = await getItems();
  res.status(200).json(items);
};

export const getItemByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req?.query?.id as string;

  try {
    const item: Item = await getItemById(id);
    if (item) res.json(item);
    else res.status(404).send(`Can not find an item with id: ${id}`);
  } catch (error) {
    res.status(400).send(`Bad request!`);
    errorHandler(error);
  }
};

export const deleteItemByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req?.params?.id;

  try {
    const isDeleted = await deleteItemById(id);

    if (isDeleted) res.status(200).send(`Deleted item with id: ${id}`);
    else res.status(404).send(`Can not find and delete item with id: ${id}`);
  } catch (error) {
    res.status(500).send("Server error");
    errorHandler(error);
  }
};

export const createItemController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data: any = req.body;
  const image = req.file as Express.Multer.File;

  try {
    const response = await createItem(data, image);

    if (response.acknowledged) res.status(200).send(response.insertedId);
    else res.status(500).send("Unable to create an item");
  } catch (error) {
    res.status(500).send("Server error!");
    errorHandler(error);
  }
};

// req.body = { data, settings }

export const updateItemController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const file = req.file as Express.Multer.File;
  const { updateCreatedDate } = JSON.parse(req.body?.settings);

  // parse form data
  // const data = Object.keys(req.body.data).reduce((acc, el) => {
  //   return { ...acc, [el]: JSON.parse(req.body[el]) };
  // }, {}) as Item;

  const data = JSON.parse(req.body.data);

  try {
    const response = await updateItem(id, data, file, updateCreatedDate);

    if (response.acknowledged)
      res.status(200).send("Item successfully updated!");
    else res.status(500).send("Unable to update an item");
  } catch (error) {
    res.status(500).send("error!");
    errorHandler(error);
  }
};

export const getItemsWithParamsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const params: Params = req.body;

  try {
    const response = await getItemsWithParams(params);

    // const response = items.data.map((el) => { })

    res.status(200).json(response);
  } catch (error) {
    errorHandler(error);
    res.status(500).send("Server error");
  }
};

export const getFullItemsWithParamsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const params: Params = req.body;

  try {
    const response = await getItemsWithParams(params, true);

    // const response = items.data.map((el) => { })

    res.status(200).json(response);
  } catch (error) {
    errorHandler(error);
    res.status(500);
  }
};
