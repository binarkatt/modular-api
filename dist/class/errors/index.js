"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotImplementedError = exports.NotFoundError = exports.UnauthorizedError = exports.AbstractError = exports.transformError = void 0;
const AbstractError_1 = require("./AbstractError");
Object.defineProperty(exports, "AbstractError", { enumerable: true, get: function () { return AbstractError_1.AbstractError; } });
// 400+
const UnauthorizedError_1 = require("./UnauthorizedError");
Object.defineProperty(exports, "UnauthorizedError", { enumerable: true, get: function () { return UnauthorizedError_1.UnauthorizedError; } });
const NotFoundError_1 = require("./NotFoundError");
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return NotFoundError_1.NotFoundError; } });
// 500+
const NotImplementedError_1 = require("./NotImplementedError");
Object.defineProperty(exports, "NotImplementedError", { enumerable: true, get: function () { return NotImplementedError_1.NotImplementedError; } });
const InternalServerError_1 = require("./InternalServerError");
Object.defineProperty(exports, "InternalServerError", { enumerable: true, get: function () { return InternalServerError_1.InternalServerError; } });
const transformError = (error) => {
    if (error instanceof AbstractError_1.AbstractError) {
        return error;
    }
    return new InternalServerError_1.InternalServerError();
};
exports.transformError = transformError;
