import { InsertOneResult, ObjectId } from "mongodb";
import bcrypt from 'bcrypt';
import db from "../db/mongo.conn";

export interface User {
  username: string;
  password: string;
  id?: ObjectId;
};

export interface LoginData {
  username: string;
  password: string;
};

const collection = "users";

export const createUser = async (data: User): Promise<InsertOneResult> => {
  const hash = await bcrypt.hash(data.password, 10);
  return await db.collection<User>(collection).insertOne({ ...data, password: hash });
}

export const getUser = async (username: string): Promise<User> => {
  const query = { username };
  return await db.collection<User>(collection).findOne(query) as User;
}

export const getUserById = async (id: string): Promise<User> => {
  const query = { _id: new ObjectId(id) };
  return await db.collection<User>(collection).findOne(query) as User;
}