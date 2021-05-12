"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const item_1 = __importDefault(require("./item"));
const User = _1.default.define("User", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    resettoken: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    tokenexpiration: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    }
});
User.beforeCreate(user => {
    const hash = bcryptjs_1.default.hashSync(user.password);
    user.password = hash;
});
User.hasMany(item_1.default, { foreignKey: 'user_id', as: 'items' });
item_1.default.belongsTo(User, { foreignKey: "user_id", as: "creator" });
exports.default = User;
