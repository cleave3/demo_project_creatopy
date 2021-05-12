"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
scalar DateTime

type Item {
  id: Int!
  title: String!
  user_id: Int!
  createdAt: String!
  updateAt: String
}

extend type Query {
  items: [ItemResponse]!
}

extend type Mutation {
  addItem(title: String!): ItemResponse!
  removeItem(itemId: Int!): RemoveItemResponse!
}

type Creator {
  name: String
}

type ItemResponse {
  id: Int!
  title: String!
  creator: Creator!
  createdAt: DateTime!
}

type RemoveItemResponse {
  id: Int!
  title: String!
}
`;
