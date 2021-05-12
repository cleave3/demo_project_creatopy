"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const helpers_1 = __importDefault(require("../utils/helpers"));
const checkAuth = (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        req.isAuth = false;
        return next();
    }
    const decoded = helpers_1.default.verifyToken(token);
    if (!decoded) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decoded.id;
    next();
};
exports.checkAuth = checkAuth;
