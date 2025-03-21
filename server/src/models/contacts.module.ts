import { ObjectId, UpdateResult } from "mongodb";
import db from "../db/mongo.conn";
import { PaginationResponse, Params } from "../utils/types";
import { getAggrPipeline } from "../utils/helpers/getAggrPipeline";
import { CONTACTS_COLLECTION } from "../utils/constants/mongo-coll.constants";

// TYPES
export interface Contact {
  href?: string;
  label: string;
  body: string;
}

export type ContactResponse = PaginationResponse<Contact>;
// TYPES END

// MODELS
export const getContacts = async (): Promise<Contact[]> => {
  return await db.collection<Contact>(CONTACTS_COLLECTION).find({}).toArray();
};

export const getContactById = async (id: string): Promise<Contact> => {
  const query = { _id: new ObjectId(id) };

  return (await db
    .collection<Contact>(CONTACTS_COLLECTION)
    .findOne(query)) as Contact;
};

export const deleteContact = async (id: string): Promise<boolean> => {
  const query = { _id: new ObjectId(id) };

  const deleted = await db.collection(CONTACTS_COLLECTION).deleteOne(query);
  return deleted.acknowledged;
};

export const createContact = async (data: Contact) => {
  return await db.collection<Contact>(CONTACTS_COLLECTION).insertOne(data);
};

export const updateContact = async (
  id: string,
  data: Contact
): Promise<UpdateResult> => {
  const query = { _id: new ObjectId(id) };

  const result = await db
    .collection<Contact>(CONTACTS_COLLECTION)
    .updateOne(query, { $set: data });

  return result;
};

export const getContactssWithParams = async (
  params: Params
): Promise<ContactResponse> => {
  const { page, paramName, paramValue } = params;

  const pipeline = getAggrPipeline(params);

  const countQuery =
    paramName && paramValue !== null ? { [paramName]: paramValue } : {};

  const coll = db.collection<Contact>(CONTACTS_COLLECTION);

  const contacts = (await coll.aggregate(pipeline).toArray()) as Contact[];

  const count = await coll.countDocuments(countQuery);

  return {
    data: contacts,
    page: page,
    totalCount: count,
  };
};
// MODELS END
