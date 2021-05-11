import express, { json, Application, ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import graphQLSchema from "./graphql/schema";
import graphQLResolver from "./graphql/resolvers";

config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(json());

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("route no found");
    next(error);
});

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    try {
        return next();
    } catch ({ message }) {
        return res.status(404).json({ status: false, code: 404, message });
    }
})

app.listen(PORT, () => console.log(`App is running on ${PORT}`));