"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const schemaMap_1 = __importDefault(require("./graphql/schemaMap"));
const auth_1 = require("./middleware/auth");
dotenv_1.config();
const app = express_1.default();
const PORT = Number(process.env.PORT) || 5000;
app.use(express_1.json());
app.use(cors_1.default());
app.use(auth_1.checkAuth);
const apolloServer = new apollo_server_express_1.ApolloServer({
    schema: schemaMap_1.default,
    context: ({ req }) => req,
    formatError: error => ({ message: error.message })
});
apolloServer.applyMiddleware({ app, path: '/graphql' });
app.listen(PORT, () => console.log(`App is running on localhost:${PORT}${apolloServer.graphqlPath}`));
