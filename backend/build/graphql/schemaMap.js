"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
const user_graphql_1 = __importDefault(require("./schemas/user.graphql"));
const item_graphql_1 = __importDefault(require("./schemas/item.graphql"));
const default_graphql_1 = __importDefault(require("./schemas/default.graphql"));
const graphql_tools_1 = require("graphql-tools");
const resolversMap_1 = __importDefault(require("./resolversMap"));
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: [default_graphql_1.default, user_graphql_1.default, item_graphql_1.default],
    resolvers: resolversMap_1.default
});
exports.default = schema;
