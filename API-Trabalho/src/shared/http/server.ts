import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import AppError from "../errors/AppError";
import "@shared/typeorm";
import isAuthenticated from "./middleware/isAuthenticated";

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.use((req, res, next) => {
  if (req.path === '/users' && req.method === 'POST') {
    return next(); // pula auth
  }
  isAuthenticated(req, res, next); 
});
app.use(
    (error: any, request: Request, response: Response, next: NextFunction): void => {
        console.error("Erro global:", error);
    }
);

app.use(
    (
        error: any,
        request: Request,
        response: Response,
        next: NextFunction
    ): void => {
        if (error instanceof AppError) {
            response.status(error.statusCode).json({
                status: "error",
                message: error.message,
            });
            return;
        }
        response.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
);

app.listen(3333, () => {
    console.log("Server started on port 3333!");
});
