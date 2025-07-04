import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repository/UserRepository";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";

const resetTokens: Record<string, string> = {};

export default class PasswordController {
    public async forgot(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { email } = request.body;
            const userRepository = getCustomRepository(UserRepository);
            const user = await userRepository.findByEmail(email);
            if (!user) {
                return response
                    .status(404)
                    .json({ error: "Usuário não encontrado." });
            }
            const token = uuidv4();
            resetTokens[token] = user.id;
            return response.json({ resetToken: token });
        } catch (err) {
            next(err);
        }
    }

    public async reset(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { token, password } = request.body;
            const userId = resetTokens[token];
            if (!userId) {
                return response
                    .status(400)
                    .json({ error: "Token inválido ou expirado." });
            }
            const userRepository = getCustomRepository(UserRepository);
            const user = await userRepository.findById(userId);
            if (!user) {
                return response
                    .status(404)
                    .json({ error: "Usuário não encontrado." });
            }
            user.password = await hash(password, 8);
            await userRepository.save(user);
            delete resetTokens[token];
            return response.json({ message: "Senha redefinida com sucesso." });
        } catch (err) {
            next(err);
        }
    }
}
