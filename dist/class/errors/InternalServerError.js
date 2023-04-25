"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const AbstractError_1 = require("./AbstractError");
const utils_1 = require("./utils");
class InternalServerError extends AbstractError_1.AbstractError {
    constructor(message) {
        super((0, utils_1.composeErrorParams)('INTERNAL_SERVER_ERROR', message));
    }
}
exports.InternalServerError = InternalServerError;
