"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ModularApi_server, _ModularApi_config, _ModularApi_apiModules, _ModularApi_infoModule;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModularApi = void 0;
const fastify_1 = __importDefault(require("fastify"));
const InfoModule_1 = require("./InfoModule");
class ModularApi {
    constructor(config, modules) {
        _ModularApi_server.set(this, void 0);
        _ModularApi_config.set(this, void 0);
        _ModularApi_apiModules.set(this, void 0);
        _ModularApi_infoModule.set(this, void 0);
        __classPrivateFieldSet(this, _ModularApi_config, config, "f");
        __classPrivateFieldSet(this, _ModularApi_server, (0, fastify_1.default)(), "f");
        __classPrivateFieldSet(this, _ModularApi_apiModules, modules || [], "f");
        if (config.enableInfoModule) {
            __classPrivateFieldSet(this, _ModularApi_infoModule, new InfoModule_1.InfoModule()
                .setRoutes([{
                    method: 'get',
                    path: '/',
                    controller: () => ({
                        name: __classPrivateFieldGet(this, _ModularApi_config, "f").serverName,
                        version: __classPrivateFieldGet(this, _ModularApi_config, "f").serverVersion,
                        description: __classPrivateFieldGet(this, _ModularApi_config, "f").serverName,
                        modules: __classPrivateFieldGet(this, _ModularApi_apiModules, "f")
                            .filter((apiModule) => apiModule.getName() !== InfoModule_1.INFO_MODULE_NAME)
                            .map((apiModule) => ({
                            name: apiModule.getName(),
                            modulePath: apiModule.getPath(),
                            endpoints: apiModule.getEndpoints(),
                        })),
                    }),
                }]), "f");
            __classPrivateFieldGet(this, _ModularApi_apiModules, "f").push(__classPrivateFieldGet(this, _ModularApi_infoModule, "f"));
        }
    }
    addModules(apiModules) {
        apiModules = Array.isArray(apiModules)
            ? apiModules
            : [apiModules];
        for (const apiModule of apiModules) {
            __classPrivateFieldGet(this, _ModularApi_apiModules, "f").push(apiModule);
        }
        return this;
    }
    start(message) {
        for (const apiModule of __classPrivateFieldGet(this, _ModularApi_apiModules, "f")) {
            apiModule.applyRoutes(__classPrivateFieldGet(this, _ModularApi_server, "f"));
        }
        __classPrivateFieldGet(this, _ModularApi_server, "f").listen({
            port: Number(__classPrivateFieldGet(this, _ModularApi_config, "f").port),
            host: '0.0.0.0',
        }).then(() => {
            for (const apiModule of __classPrivateFieldGet(this, _ModularApi_apiModules, "f")) {
                const apiName = apiModule.getName();
                const apiPath = apiModule.getPath();
                for (const { method, path } of apiModule.getRoutes()) {
                    const fullPath = `${apiPath}${path}`;
                    console.warn(`[${apiName}] Route [${method.toUpperCase()}] on path [${fullPath}]`);
                }
            }
            console.warn(message || `Modular api server has started on ${__classPrivateFieldGet(this, _ModularApi_config, "f").host}:${__classPrivateFieldGet(this, _ModularApi_config, "f").port}`);
        });
    }
}
exports.ModularApi = ModularApi;
_ModularApi_server = new WeakMap(), _ModularApi_config = new WeakMap(), _ModularApi_apiModules = new WeakMap(), _ModularApi_infoModule = new WeakMap();
