"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractError = void 0;
class AbstractError extends Error {
    constructor({ statusCode, error, message }) {
        super();
        this.statusCode = statusCode;
        this.error = error;
        this.message = message;
    }
}
exports.AbstractError = AbstractError;
