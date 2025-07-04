import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repository/UserRepository";

export default class CreateUserService {
    public async execute(): Promise<any[]> {
        const userRepository = getCustomRepository(UserRepository);
        const users = await userRepository.find({
            select: [
                "id",
                "username",
                "name",
                "email",
                "funcao",
                "createdAt",
                "updatedAt",
            ],
        });
        return users;
    }
}
