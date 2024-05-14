"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const items_controllers_1 = require("../controllers/items.controllers");
const items_validation_1 = require("../utils/validations/items.validation");
const params_validation_1 = require("../utils/validations/params.validation");
const auth_1 = require("../utils/middlewares/auth");
const multer_1 = __importStar(require("multer"));
const upload = (0, multer_1.default)({ storage: (0, multer_1.memoryStorage)() });
exports.router = express_1.default.Router();
exports.router.use(express_1.default.json());
// get item by id
exports.router.get("/single", items_controllers_1.getItemByIdController);
// get all items
exports.router.get("/", items_controllers_1.getItemsController);
// get items by params and page
exports.router.post("/", params_validation_1.validateParams, items_controllers_1.getItemsWithParamsController);
// delete item by id
exports.router.delete("/:id/", auth_1.checkAuth, items_controllers_1.deleteItemByIdController);
// create item
exports.router.post("/create", [auth_1.checkAuth, upload.single("image"), items_validation_1.validateItem], items_controllers_1.createItemController);
// update item by id
exports.router.put("/:id/", [auth_1.checkAuth, upload.single("image"), items_validation_1.validateItem], items_controllers_1.updateItemController);
exports.default = exports.router;
