"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const AbstractError_1 = require("./AbstractError");
const utils_1 = require("./utils");
class UnauthorizedError extends AbstractError_1.AbstractError {
    constructor(message) {
        super((0, utils_1.composeErrorParams)('UNAUTHORIZED', message));
    }
}
exports.UnauthorizedError = UnauthorizedError;
