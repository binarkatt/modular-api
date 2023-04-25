"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedError = void 0;
const AbstractError_1 = require("./AbstractError");
const utils_1 = require("./utils");
class NotImplementedError extends AbstractError_1.AbstractError {
    constructor(message) {
        super((0, utils_1.composeErrorParams)('NOT_IMPLEMENTED', message));
    }
}
exports.NotImplementedError = NotImplementedError;
