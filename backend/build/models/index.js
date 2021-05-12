"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
const sequelize = new sequelize_1.Sequelize({ dialect: "sqlite", storage: path_1.default.join(__dirname, "/../database/db.sqlite") });
const db = { sequelize, Sequelize: sequelize_1.Sequelize };
Object.values(db).forEach((model) => {
    if (model.associate) {
        model.associate(db);
    }
});
exports.default = sequelize;
