import express, { json, Application, Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schemaMap";
import { checkAuth } from "./middleware/auth";

config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(json());
app.use(cors());
app.use(checkAuth);

const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => req,
    formatError: error => ({ message: error.message }),
    formatResponse: res => res.http
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, () => console.log(`App is running on localhost:${PORT}${apolloServer.graphqlPath}`));
