"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUser = exports.createUser = void 0;
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongo_conn_1 = __importDefault(require("../db/mongo.conn"));
;
;
const collection = "users";
const createUser = async (data) => {
    const hash = await bcrypt_1.default.hash(data.password, 10);
    return await mongo_conn_1.default.collection(collection).insertOne(Object.assign(Object.assign({}, data), { password: hash }));
};
exports.createUser = createUser;
const getUser = async (username) => {
    const query = { username };
    return await mongo_conn_1.default.collection(collection).findOne(query);
};
exports.getUser = getUser;
const getUserById = async (id) => {
    const query = { _id: new mongodb_1.ObjectId(id) };
    return await mongo_conn_1.default.collection(collection).findOne(query);
};
exports.getUserById = getUserById;
