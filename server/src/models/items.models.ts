import { InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import db from "../db/mongo.conn";
import { uploadImage } from "./images.models";
import { getImageForUpload } from "../utils/helpers/getImageForUpload";
import { ITEMS_COLLECTION } from "../utils/constants/mongo-coll.constants";
import { PaginationResponse, Params } from "../utils/types";
import { getAggrPipeline } from "../utils/helpers/getAggrPipeline";

// INTERFACES
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
  _id?: ObjectId;
  imageUrl?: string;
}

export interface ImageData {
  bytes: string;
  fileName: string;
}

export type ItemResponse = PaginationResponse<ShortItem>;
// INTERFACES END

// MODELS
export const getItems = async (): Promise<Item[]> => {
  return await db.collection<Item>(ITEMS_COLLECTION).find({}).toArray();
};

export const getItemById = async (id: string): Promise<Item> => {
  const query = { _id: new ObjectId(id) };
  return (await db.collection<Item>(ITEMS_COLLECTION).findOne(query)) as Item;
};

export const deleteItemById = async (id: string): Promise<boolean> => {
  const query = { _id: new ObjectId(id) };
  const deleted = await db.collection<Item>(ITEMS_COLLECTION).deleteOne(query);
  return deleted.acknowledged;
};

export const createItem = async (
  data: any,
  image: Express.Multer.File
): Promise<InsertOneResult> => {
  // parse data from a form-data
  const newData = Object.keys(data).reduce(
    (acc, el) => ({ ...acc, [el]: JSON.parse(data[el]) }),
    {}
  ) as Item;

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
  const result = await db.collection<Item>(ITEMS_COLLECTION).insertOne(newData);

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
    .collection<Item>(ITEMS_COLLECTION)
    .updateOne(query, { $set: data });

  return result;
};

export const getItemsWithParams = async (
  params: Params,
  fullData: boolean = false
): Promise<ItemResponse> => {
  const { page, paramName, paramValue } = params;

  const pipeline = getAggrPipeline(params);

  const countQuery =
    paramName && paramValue !== null ? { [paramName]: paramValue } : {};

  const coll = db.collection<Item>(ITEMS_COLLECTION);

  const items = (await coll.aggregate(pipeline).toArray()) as Item[];

  const finalizedItems = !fullData
    ? (items.map((el) => ({
        title: el.title,
        imageUrl: el.imageUrl,
        id: el._id?.toString(),
      })) as ShortItem[])
    : items;

  const count = await coll.countDocuments(countQuery);

  return {
    data: finalizedItems,
    page: page,
    totalCount: count,
  };
};
// MODELS END
