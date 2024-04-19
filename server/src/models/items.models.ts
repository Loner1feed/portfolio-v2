import { InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import db from "../db/mongo.conn";
import { uploadImage } from "./images.models";
import { getImageForUpload } from "../utils/helpers/getImageForUpload";

export interface Item extends ShortItem {
  description: string;
  websiteUrl: string;
  repoUrl: string;
  stack: string[];
  isSimple: boolean;
  imagePublicId?: string;
}

export interface ShortItem {
  title: string;
  id?: ObjectId;
  imageUrl?: string;
}

export interface ImageData {
  bytes: string;
  fileName: string;
}

export interface PaginationResponse {
  page: number;
  totalPages: number;
  data: ShortItem[];
}

export interface Params {
  page: number;
  pageSize: number;
  paramName: string;
  paramValue: string | number | boolean;
}

const collection = "items";

export const getItems = async (): Promise<Item[]> => {
  return await db.collection<Item>(collection).find({}).toArray();
};

export const getItemById = async (id: string): Promise<Item> => {
  const query = { _id: new ObjectId(id) };
  return (await db.collection<Item>(collection).findOne(query)) as Item;
};

export const deleteItemById = async (id: string): Promise<boolean> => {
  const query = { _id: new ObjectId(id) };
  const deleted = await db.collection<Item>(collection).deleteOne(query);
  return deleted.acknowledged;
};

export const createItem = async (
  data: Item,
  image: Express.Multer.File
): Promise<InsertOneResult> => {
  const newData = data;

  // get image data in BASE64 format
  const imageData = getImageForUpload(image);

  // upload image to Cloudinary and modify the data object (if we have imageUrl)
  if (imageData) {
    const { imageUrl, imagePublicId } = await uploadImage(imageData);
    if (imageUrl && imagePublicId) {
      newData.imageUrl = imageUrl;
      newData.imagePublicId = imagePublicId;
    }
  }
  const result = await db.collection<Item>(collection).insertOne(newData);

  return result;
};

export const updateItem = async (
  id: string,
  data: Item,
  file: Express.Multer.File
): Promise<UpdateResult> => {
  const query = { _id: new ObjectId(id) };

  // replace image in Cloudinary if we have one
  if (file) {
    if (!!data.imagePublicId) {
      const imageData = getImageForUpload(file) as ImageData;
      await uploadImage({
        bytes: imageData?.bytes,
        fileName: data.imagePublicId,
      });
    }
  }

  // update item with data provided
  const result = await db
    .collection<Item>(collection)
    .updateOne(query, { $set: data });

  return result;
};

export const getItemsWithParams = async (
  params: Params
): Promise<PaginationResponse> => {
  const { page, pageSize, paramName, paramValue } = params;

  const aggregationPipeline = [
    { $match: { [paramName]: paramValue } },
    { $skip: page ? page * pageSize : 0 },
    { $limit: pageSize },
  ];

  const countQuery = { [paramName]: paramValue };

  const coll = db.collection<Item>(collection);

  const items = (await coll.aggregate(aggregationPipeline).toArray()) as Item[];

  const shortItems = items.map((el) => ({
    title: el.title,
    imageUrl: el.imageUrl,
    id: el.id?.toString(),
  })) as ShortItem[];

  const count = await coll.countDocuments(countQuery);

  return {
    data: shortItems,
    page: page,
    totalPages: Math.ceil(count / pageSize),
  };
};

//TODO:
