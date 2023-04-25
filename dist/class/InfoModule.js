"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoModule = exports.INFO_MODULE_NAME = void 0;
const ApiModule_1 = require("./ApiModule");
exports.INFO_MODULE_NAME = 'Info';
class InfoModule extends ApiModule_1.ApiModule {
    constructor() {
        super({
            name: exports.INFO_MODULE_NAME,
            path: '',
            routes: [],
        });
    }
}
exports.InfoModule = InfoModule;
