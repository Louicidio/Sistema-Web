import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repository/UserRepository";
import User from "../typeorm/entities/User";

interface IRequest {
    username: string;
    name: string;
    email: string;
    password: string;
    funcao: "admin" | "mecanico" | "atendente";
}

export class CreateUserService {
    public async execute({
        username,
        name,
        email,
        password,
        funcao,
    }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository);

        const checkUserExists = await usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError("Email já esta em uso.");
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            username,
            name,
            email,
            password: hashedPassword,
            funcao,
        });

        await usersRepository.save(user);
        return user;
    }
}

export class ListUserService {
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UserRepository);
        const users = await usersRepository.find();
        return users;
    }
}
