"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const user_1 = require("./resolvers/user");
const item_1 = require("./resolvers/item");
const graphql_type_datetime_1 = __importDefault(require("graphql-type-datetime"));
const resolverMap = lodash_1.merge(user_1.UserResolvers, item_1.ItemResolvers, { DateTime: graphql_type_datetime_1.default });
exports.default = resolverMap;
