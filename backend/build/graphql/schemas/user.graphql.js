"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
type User {
  id: Int!
  name: String!
  email: String!
  password: String!
  resettoken: Int!
  tokenexpiration: Int!
  createdAt: String!
  updateAt: String
}

extend type Query {
  login(email: String!, password: String!): AuthenticateResponse!
}

extend type Mutation {
  register(name: String!, email: String!, password: String!): AuthenticateResponse!
  forgotPassword(email: String!): ForgotPasswordResponse!
  resetPassword(resettoken: Int!, password: String): ResetPasswordResponse!
}

type AuthenticateResponse {
  name: String!
  token: String!
}

type ForgotPasswordResponse {
  token: String!
  message: String!
}

type ResetPasswordResponse {
  message: String!
}
`;
