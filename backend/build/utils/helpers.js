"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Helper class
 */
class Helper {
    static genToken(payload) {
        return jsonwebtoken_1.default.sign(payload, Helper.APP_SECRET, { expiresIn: "24hr" });
    }
    static verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, Helper.APP_SECRET);
    }
    static verifyHash(password, hash) {
        return bcryptjs_1.default.compareSync(password, hash);
    }
    static genHash(password) {
        return bcryptjs_1.default.hashSync(password, 10);
    }
}
Helper.APP_SECRET = process.env.APP_SECRET || "appsecret";
exports.default = Helper;
