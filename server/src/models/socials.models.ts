import { ObjectId, UpdateResult } from "mongodb";
import db from "../db/mongo.conn";
import { SOCIALS_COLLECTION } from "../utils/constants/mongo-coll.constants";
import { PaginationResponse, Params } from "../utils/types";
import { getAggrPipeline } from "../utils/helpers/getAggrPipeline";

// TYPES
export interface Social {
  id?: string;
  href: string;
  name: string;
  iconName: string;
}

export type SocialResponse = PaginationResponse<Social>;
// TYPES END

// MODELS
export const getSocials = async (): Promise<Social[]> => {
  return await db.collection<Social>(SOCIALS_COLLECTION).find({}).toArray();
};

export const getSocialById = async (id: string): Promise<Social> => {
  const query = { _id: new ObjectId(id) };

  return (await db
    .collection<Social>(SOCIALS_COLLECTION)
    .findOne(query)) as Social;
};

export const deleteSocial = async (id: string): Promise<boolean> => {
  const query = { _id: new ObjectId(id) };

  const deleted = await db.collection(SOCIALS_COLLECTION).deleteOne(query);
  return deleted.acknowledged;
};

export const createSocial = async (data: Social) => {
  return await db.collection<Social>(SOCIALS_COLLECTION).insertOne(data);
};

export const updateSocial = async (
  id: string,
  data: Social
): Promise<UpdateResult> => {
  const query = { _id: new ObjectId(id) };

  const result = await db
    .collection<Social>(SOCIALS_COLLECTION)
    .updateOne(query, { $set: data });

  return result;
};

export const getSocialsWithParams = async (
  params: Params
): Promise<SocialResponse> => {
  const { page, paramName, paramValue } = params;

  const pipeline = getAggrPipeline(params);

  const countQuery =
    paramName && paramValue !== null ? { [paramName]: paramValue } : {};

  const coll = db.collection<Social>(SOCIALS_COLLECTION);

  const socials = (await coll.aggregate(pipeline).toArray()) as Social[];

  const count = await coll.countDocuments(countQuery);

  return {
    data: socials,
    page: page,
    totalCount: count,
  };
};
// MODELS END
