import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repository/UserRepository";
import { compare } from "bcryptjs";
import { sign, SignOptions } from "jsonwebtoken";
import authConfig from "@config/auth";

export default class SessionController {
    public async create(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { email, password } = request.body;
            const userRepository = getCustomRepository(UserRepository);
            const user = await userRepository.findByEmail(email);
            if (!user) {
                return response
                    .status(401)
                    .json({ error: "Usuário ou senha inválidos." });
            }
            console.log("Usuário encontrado:", user);
            console.log("Senha recebida:", password);
            console.log("Senha no banco:", user.password);
            const passwordMatched = await compare(password, user.password);
            if (!passwordMatched) {
                return response
                    .status(401)
                    .json({ error: "Usuário ou senha inválidos." });
            }
            const jwtOptions: SignOptions = {
                expiresIn: authConfig.jwt.expiresIn as any,
            };
            const token = sign(
                {
                    sub: user.id,
                    role: user.funcao,
                },
                String(authConfig.jwt.secret),
                jwtOptions
            );
            const { password: _, ...userWithoutPassword } = user;
            return response.json({ user: userWithoutPassword, token });
        } catch (err) {
            next(err);
        }
    }
}
