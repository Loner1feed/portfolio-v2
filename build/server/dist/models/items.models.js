"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemsWithParams = exports.updateItem = exports.createItem = exports.deleteItemById = exports.getItemById = exports.getItems = void 0;
const mongodb_1 = require("mongodb");
const mongo_conn_1 = __importDefault(require("../db/mongo.conn"));
const images_models_1 = require("./images.models");
const getImageForUpload_1 = require("../utils/helpers/getImageForUpload");
const collection = "items";
const getItems = async () => {
    return await mongo_conn_1.default.collection(collection).find({}).toArray();
};
exports.getItems = getItems;
const getItemById = async (id) => {
    const query = { _id: new mongodb_1.ObjectId(id) };
    return (await mongo_conn_1.default.collection(collection).findOne(query));
};
exports.getItemById = getItemById;
const deleteItemById = async (id) => {
    const query = { _id: new mongodb_1.ObjectId(id) };
    const deleted = await mongo_conn_1.default.collection(collection).deleteOne(query);
    return deleted.acknowledged;
};
exports.deleteItemById = deleteItemById;
const createItem = async (data, image) => {
    const newData = data;
    // get image data in BASE64 format
    const imageData = (0, getImageForUpload_1.getImageForUpload)(image);
    // upload image to Cloudinary and modify the data object (if we have imageUrl)
    if (imageData) {
        const { imageUrl, imagePublicId } = await (0, images_models_1.uploadImage)(imageData);
        if (imageUrl && imagePublicId) {
            newData.imageUrl = imageUrl;
            newData.imagePublicId = imagePublicId;
        }
    }
    const result = await mongo_conn_1.default.collection(collection).insertOne(newData);
    return result;
};
exports.createItem = createItem;
const updateItem = async (id, data, file) => {
    const query = { _id: new mongodb_1.ObjectId(id) };
    // replace image in Cloudinary if we have one
    if (file) {
        if (!!data.imagePublicId) {
            const imageData = (0, getImageForUpload_1.getImageForUpload)(file);
            await (0, images_models_1.uploadImage)({
                bytes: imageData === null || imageData === void 0 ? void 0 : imageData.bytes,
                fileName: data.imagePublicId,
            });
        }
    }
    // update item with data provided
    const result = await mongo_conn_1.default
        .collection(collection)
        .updateOne(query, { $set: data });
    return result;
};
exports.updateItem = updateItem;
const getItemsWithParams = async (params) => {
    const { page, pageSize, paramName, paramValue } = params;
    let aggregationPipeline;
    if (paramName && paramValue !== null) {
        aggregationPipeline = [
            { $match: { [paramName]: paramValue } },
            { $skip: page ? page * pageSize : 0 },
            { $limit: pageSize },
        ];
    }
    else {
        aggregationPipeline = [
            { $skip: page ? page * pageSize : 0 },
            { $limit: pageSize },
        ];
    }
    const countQuery = paramName && paramValue !== null ? { [paramName]: paramValue } : {};
    const coll = mongo_conn_1.default.collection(collection);
    const items = (await coll.aggregate(aggregationPipeline).toArray());
    const shortItems = items.map((el) => {
        var _a;
        return ({
            title: el.title,
            imageUrl: el.imageUrl,
            id: (_a = el._id) === null || _a === void 0 ? void 0 : _a.toString(),
        });
    });
    const count = await coll.countDocuments(countQuery);
    return {
        data: shortItems,
        page: page,
        totalCount: count,
    };
};
exports.getItemsWithParams = getItemsWithParams;
//TODO:
