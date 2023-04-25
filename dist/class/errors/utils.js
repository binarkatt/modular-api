"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeErrorParams = void 0;
const http_status_codes_1 = require("http-status-codes");
const composeErrorParams = (type, message) => {
    const statusCode = http_status_codes_1.StatusCodes[type];
    if (!statusCode) {
        throw new Error(`Status code for ${type} was not found.`);
    }
    const error = http_status_codes_1.ReasonPhrases[type];
    if (!error) {
        throw new Error(`Reason phrases for type ${type} was not found.`);
    }
    return {
        statusCode,
        error,
        message: message || error,
    };
};
exports.composeErrorParams = composeErrorParams;
