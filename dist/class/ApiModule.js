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
var _ApiModule_name, _ApiModule_path, _ApiModule_routes;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const errors_1 = require("./errors");
class ApiModule {
    constructor({ name, path, routes }) {
        _ApiModule_name.set(this, void 0);
        _ApiModule_path.set(this, void 0);
        _ApiModule_routes.set(this, void 0);
        __classPrivateFieldSet(this, _ApiModule_name, name, "f");
        __classPrivateFieldSet(this, _ApiModule_path, path, "f");
        __classPrivateFieldSet(this, _ApiModule_routes, routes, "f");
    }
    getName() {
        return __classPrivateFieldGet(this, _ApiModule_name, "f");
    }
    getPath() {
        return __classPrivateFieldGet(this, _ApiModule_path, "f");
    }
    getFullPath(path) {
        return `${__classPrivateFieldGet(this, _ApiModule_path, "f")}${path}`;
    }
    getRoutes() {
        return __classPrivateFieldGet(this, _ApiModule_routes, "f");
    }
    ;
    setRoutes(routes) {
        __classPrivateFieldSet(this, _ApiModule_routes, routes, "f");
        return this;
    }
    ;
    getEndpoints() {
        const endpoints = [];
        for (const route of __classPrivateFieldGet(this, _ApiModule_routes, "f")) {
            endpoints.push({
                method: route.method,
                path: route.path,
                fullPath: this.getFullPath(route.path),
                description: route.description,
            });
        }
        return endpoints;
    }
    ;
    applyRoutes(server) {
        for (const route of this.getRoutes()) {
            this.applyRoute(server, route);
        }
    }
    ;
    applyRoute(server, route) {
        const { method, path, controller, getRequestArguments = (req) => req, responseHeaders = [], } = route;
        server[method](this.getFullPath(path), async (req, reply) => {
            try {
                const args = getRequestArguments(req);
                const iterableArgs = Array.isArray(args) ? args : [args];
                const response = await controller(...iterableArgs);
                // Set response headers
                for (const header of responseHeaders) {
                    reply.header(header.key, header.value);
                }
                reply.send(response);
            }
            catch (e) {
                console.warn(`[${method.toUpperCase()}] ${path} error`, e);
                const { message, error, statusCode } = (0, errors_1.transformError)(e);
                reply.status(statusCode).send({
                    message,
                    error,
                    statusCode,
                });
            }
        });
    }
    ;
}
exports.ApiModule = ApiModule;
_ApiModule_name = new WeakMap(), _ApiModule_path = new WeakMap(), _ApiModule_routes = new WeakMap();
