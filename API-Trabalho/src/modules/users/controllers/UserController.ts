import { Request, Response, NextFunction } from "express";
import {
    CreateUserService,
    ListUserService,
} from "../services/CreateUserService";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repository/UserRepository";
import { getCustomRepository } from "typeorm";
import authConfig from "@config/auth";
import { sign, SignOptions } from "jsonwebtoken";

export default class UserController {
    public async index(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const listUser = new ListUserService();
            const users = await listUser.execute();

            const usersSafe = users.map((user: User) => {
                const { password: _, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
            return response.json(usersSafe);
        } catch (err) {
            console.log("Error in UserController index:", err);
            next(err);
        }
    }

    public async create(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const createUser = new CreateUserService();
            const { username, name, email, password, funcao } = request.body;

            if (!username || !name || !email || !password || !funcao) {
                throw new Error(
                    "Preencha todos os campos obrigatórios (username, name, email, password, funcao)."
                );
            }

            const userRepository = getCustomRepository(UserRepository);
            const userExists = await userRepository.findByEmail(email);
            if (userExists) {
                throw new Error("Email já está em uso.");
            }

            const user = await createUser.execute({
                username,
                name,
                email,
                password,
                funcao,
            });

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

            // Remove a senha antes de retornar
            const { password: _, ...userWithoutPassword } = user;

            return response.status(201).json({
                user: userWithoutPassword,
                token,
            });
        } catch (err) {
            console.error(err);
            return response
                .status(500)
                .json({ error: "Internal server error" });
            next(err);
        }
    }

    public async update(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { id } = request.params;
            const { username, name, email, password, funcao } = request.body;
            const userRepository = getCustomRepository(UserRepository);
            const user = await userRepository.findById(id);
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }
            if (username) user.username = username;
            if (name) user.name = name;
            if (email) user.email = email;
            if (funcao) user.funcao = funcao;
            if (password) {
                const { hash } = await import("bcryptjs");
                user.password = await hash(password, 8);
            }
            await userRepository.save(user);
            const { password: _, ...userWithoutPassword } = user;
            return response.json(userWithoutPassword);
        } catch (err) {
            console.error("Error in UserController update:", err);
            next(err);
        }
    }

    public async updateProfile(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { username, name, email, password, funcao } = request.body;
            const userRepository = getCustomRepository(UserRepository);
            const user = await userRepository.findById(request.user.id);
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }
            if (username) user.username = username;
            if (name) user.name = name;
            if (email) user.email = email;
            if (funcao) user.funcao = funcao;
            if (password) {
                const { hash } = await import("bcryptjs");
                user.password = await hash(password, 8);
            }
            await userRepository.save(user);
            const { password: _, ...userWithoutPassword } = user;
            return response.json(userWithoutPassword);
        } catch (err) {
            console.error("Error in UserController updateProfile:", err);
            next(err);
        }
    }

    public async delete(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { id } = request.params;
            const userRepository = getCustomRepository(UserRepository);
            const user = await userRepository.findById(id);
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }
            await userRepository.remove(user);
            return response.status(204).send();
        } catch (err) {
            console.error("Error in UserController delete:", err);
            next(err);
        }
    }

    public async deleteProfile(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const userRepository = getCustomRepository(UserRepository);
            const user = await userRepository.findById(request.user.id);
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }
            await userRepository.remove(user);
            return response.status(204).send();
        } catch (err) {
            console.error("Error in UserController deleteProfile:", err);
            next(err);
        }
    }
}
