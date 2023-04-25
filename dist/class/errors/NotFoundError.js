"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const AbstractError_1 = require("./AbstractError");
const utils_1 = require("./utils");
class NotFoundError extends AbstractError_1.AbstractError {
    constructor(message) {
        super((0, utils_1.composeErrorParams)('NOT_FOUND', message));
    }
}
exports.NotFoundError = NotFoundError;
