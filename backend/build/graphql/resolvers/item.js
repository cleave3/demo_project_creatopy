"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemResolvers = void 0;
const item_1 = __importDefault(require("../../models/item"));
const user_1 = __importDefault(require("../../models/user"));
const apollo_server_errors_1 = require("apollo-server-errors");
exports.ItemResolvers = {
    Query: {
        items(_, args, req) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!req.isAuth)
                        throw new apollo_server_errors_1.AuthenticationError("please login");
                    const items = yield item_1.default.findAll({ where: { user_id: req.userId }, include: { model: user_1.default, as: "creator" }, order: [["id", "DESC"]] });
                    return items;
                }
                catch (error) {
                    throw new apollo_server_errors_1.ApolloError(error);
                }
            });
        }
    },
    Mutation: {
        addItem(_, args, req) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!req.isAuth)
                        throw new Error("unauthenticated");
                    const { title } = args;
                    const item = yield item_1.default.create({ title, user_id: req.userId });
                    const user = yield user_1.default.findOne({ where: { id: req.userId }, attributes: ["name"] });
                    return { id: item.id, title: item.title, creator: user, createdAt: String(item.createdAt) };
                }
                catch (error) {
                    throw error;
                }
            });
        },
        removeItem(_, args, req) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!req.isAuth)
                        throw new Error("unauthenticated");
                    const { itemId } = args;
                    const item = yield item_1.default.findOne({ where: { id: itemId } });
                    if (!item)
                        throw new Error("Item not found");
                    if (item.user_id !== req.userId)
                        throw new Error("you are not allowed to perform this operation");
                    const removedItem = yield item_1.default.destroy({ where: { id: itemId } });
                    if (removedItem < 1)
                        throw new Error("unable to delete item");
                    return { id: item.id, title: item.title };
                }
                catch (error) {
                    throw error;
                }
            });
        }
    }
};
