"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
scalar JSON
scalar JSONObject

type Query {
  _empty: String
}

type Mutation {
  _empty: String
}`;
