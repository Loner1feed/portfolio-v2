"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || "3002";
const app = (0, express_1.default)();
//use cors
app.use((0, cors_1.default)());
// use routes
app.use("/", routes_1.default);
// start server
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
exports.default = app;
