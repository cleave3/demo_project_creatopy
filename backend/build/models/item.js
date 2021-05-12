"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Item = _1.default.define("Item", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    user_id: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    }
});
exports.default = Item;
