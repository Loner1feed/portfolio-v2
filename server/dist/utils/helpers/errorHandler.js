"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error) => {
    console.log("\x1b[33mServer error:\x1b[0m " + error.message);
};
exports.errorHandler = errorHandler;
