"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemsWithParamsController = exports.updateItemController = exports.createItemController = exports.deleteItemByIdController = exports.getItemByIdController = exports.getItemsController = void 0;
const items_models_1 = require("../models/items.models");
const errorHandler_1 = require("../utils/helpers/errorHandler");
const getItemsController = async (_req, res) => {
    const items = await (0, items_models_1.getItems)();
    res.status(200).json(items);
};
exports.getItemsController = getItemsController;
const getItemByIdController = async (req, res) => {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const item = await (0, items_models_1.getItemById)(id);
        if (item)
            res.json(item);
        else
            res.status(404).send(`Can not find an item with id: ${id}`);
    }
    catch (error) {
        res.status(400).send(`Bad request!`);
        (0, errorHandler_1.errorHandler)(error);
    }
};
exports.getItemByIdController = getItemByIdController;
const deleteItemByIdController = async (req, res) => {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const isDeleted = await (0, items_models_1.deleteItemById)(id);
        if (isDeleted)
            res.status(200).send(`Deleted item with id: ${id}`);
        else
            res.status(404).send(`Can not find and delete item with id: ${id}`);
    }
    catch (error) {
        res.status(500);
        (0, errorHandler_1.errorHandler)(error);
    }
};
exports.deleteItemByIdController = deleteItemByIdController;
const createItemController = async (req, res) => {
    const data = req.body;
    const image = req.file;
    try {
        const response = await (0, items_models_1.createItem)(data, image);
        if (response.acknowledged)
            res.status(200).send(response.insertedId);
        else
            res.status(500).send("Unable to create an item");
    }
    catch (error) {
        res.status(500);
        (0, errorHandler_1.errorHandler)(error);
    }
};
exports.createItemController = createItemController;
const updateItemController = async (req, res) => {
    const id = req.params.id;
    const file = req.file;
    // parse form data
    const data = Object.keys(req.body).reduce((acc, el) => {
        return Object.assign(Object.assign({}, acc), { [el]: JSON.parse(req.body[el]) });
    }, {});
    try {
        const response = await (0, items_models_1.updateItem)(id, data, file);
        if (response.acknowledged)
            res.status(200).send("Item successfully updated!");
        else
            res.status(500).send("Unable to update an item");
    }
    catch (error) {
        res.status(500).send("error!");
        (0, errorHandler_1.errorHandler)(error);
    }
};
exports.updateItemController = updateItemController;
const getItemsWithParamsController = async (req, res) => {
    const params = req.body;
    try {
        const response = await (0, items_models_1.getItemsWithParams)(params);
        // const response = items.data.map((el) => { })
        res.status(200).json(response);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error);
        res.status(500);
    }
};
exports.getItemsWithParamsController = getItemsWithParamsController;
