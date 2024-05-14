"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const errorHandler_1 = require("../utils/helpers/errorHandler");
// env constants
const uri = process.env.ATLAS_URI || "";
const dbName = process.env.DB_NAME || "";
// const collName: string = process.env.ITEMS_COLLECTION || "";
const client = new mongodb_1.MongoClient(uri);
client
    .connect()
    .then(() => {
    console.log(`\x1b[33mSuccessfully connected! \n \x1b[0m`);
})
    .catch((error) => (0, errorHandler_1.errorHandler)(error));
const db = client.db(dbName);
exports.default = db;
