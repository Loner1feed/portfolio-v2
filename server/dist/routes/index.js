"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const items_routes_1 = __importDefault(require("./items.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const images_routes_1 = __importDefault(require("./images.routes"));
const router = (0, express_1.Router)();
// mount routes here 👇
router.use("/items", items_routes_1.default);
router.use("/auth", users_routes_1.default);
router.use("/image", images_routes_1.default);
exports.default = router;
