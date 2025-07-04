import "reflect-metadata";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
        user: {
            id: string;
            role?: string;
        };
    }
}

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
    role?: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Token JWT não informado", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verify(
            token,
            String(authConfig.jwt.secret)
        ) as ITokenPayload;
        request.user = {
            id: decoded.sub,
            role: decoded.role,
        };
        return next();
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === "TokenExpiredError") {
                throw new AppError("Token expirado", 401);
            }
            if (error.name === "JsonWebTokenError") {
                throw new AppError("Token inválido", 401);
            }
        }
        throw new AppError("Falha na autenticação", 401);
    }
}
