import { InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import db from '../db/mongo.conn';

export interface Item {
  title: string;
  description: string;
  websiteUrl: string;
  repoUrl: string;
  stack: string[];
  isSimple: boolean;
  id?: ObjectId
};

export interface PaginationResponse {
  page: number,
  totalPages: number,
  data: Item[]
}

export interface Params {
  page: number,
  pageSize: number,
  paramName: string,
  paramValue: string | number | boolean
};

const collection = 'items';

export const getItems = async (): Promise<Item[]> => {
  return await db.collection<Item>(collection).find({}).toArray();
};

export const getItemById = async (id: string): Promise<Item> => {
  const query = { _id: new ObjectId(id) };
  return await db.collection<Item>(collection).findOne(query) as Item;
};

export const deleteItemById = async (id: string): Promise<boolean> => {
  const query = { _id: new ObjectId(id) };
  const deleted = await db.collection<Item>(collection).deleteOne(query);
  return deleted.acknowledged;
}

export const createItem = async (data: Item): Promise<InsertOneResult> => {

  const result = await db.collection<Item>(collection).insertOne(data);

  return result;
}

export const updateItem = async (id: string, data: Item): Promise<UpdateResult> => {

  const query = { _id: new ObjectId(id) }

  const result = await db.collection<Item>(collection).updateOne(query, { $set: data });

  return result;
}

export const getItemsWithParams = async (params: Params): Promise<PaginationResponse> => {

  const { page, pageSize, paramName, paramValue } = params;

  const aggregationPipeline = [
    { $match: { [paramName]: paramValue } },
    { $skip: page ? page*pageSize : 0 },
    { $limit: pageSize }
  ];

  const countQuery = { [paramName]: paramValue }; 

  const coll = db.collection<Item>(collection);

  const items = await coll.aggregate(aggregationPipeline).toArray() as Item[];

  const count = await coll.countDocuments(countQuery);

  return ({
    data: items,
    page: page,
    totalPages: Math.ceil(count / pageSize)
  });
}

//TODO: