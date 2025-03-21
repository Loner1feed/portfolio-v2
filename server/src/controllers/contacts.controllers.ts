import { Request, Response } from "express";
import { errorHandler } from "../utils/helpers/errorHandler";
import {
  getContacts,
  createContact,
  deleteContact,
  getContactById,
  getContactssWithParams,
  updateContact,
} from "../models/contacts.module";

export const getContactsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contacts = await getContacts();
    res.status(200).json(contacts);
  } catch (error) {
    errorHandler(error);
    console.log(error);
    res.status(500).send("Server error");
  }
};

export const getContactByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;

    const contact = await getContactById(id);

    if (contact) res.json(contact);
    else res.status(404).send("Contact not found");
  } catch (error) {
    errorHandler(error);
    res.status(500).send("Server error");
  }
};

export const createContactController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  try {
    const response = await createContact(req.body);

    if (response.acknowledged) res.status(200).send(response.insertedId);
    else res.status(500).send("Unable to create an contact");
  } catch (error) {
    errorHandler(error);
    console.log(error);
    res.status(500).send("Server error");
  }
};

export const updateContactController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const data = req.body;

  try {
    const response = await updateContact(id, data);

    if (response.acknowledged)
      res.status(200).send("Contact successfully updated!");
    else res.status(500).send("Unable to update an contact");
  } catch (error) {
    res.status(500).send("error!");
    errorHandler(error);
  }
};

export const getContactsWithParamsController = async (
  req: Request,
  res: Response
) => {
  try {
    const params = req.body;
    const response = await getContactssWithParams(params);

    res.status(200).json(response);
  } catch (error) {
    // errorHandler(error);
    res.status(500).send("Server error");
  }
};

export const deleteContactController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req?.params?.id;

  try {
    const isDeleted = await deleteContact(id);

    if (isDeleted) res.status(200).send(`Deleted contact with id: ${id}`);
    else res.status(404).send(`Can not find and delete contact with id: ${id}`);
  } catch (error) {
    res.status(500).send("Server error");
    errorHandler(error);
  }
};
