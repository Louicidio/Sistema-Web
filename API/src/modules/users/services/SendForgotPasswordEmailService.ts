import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import path from 'path';
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest{
  email: string;
}

export default class SendForgotPasswordEmailService{

  public async execute({ email }: IRequest) : Promise<void>{
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRespository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);
    if(!user){
      throw new AppError('User does not exists.');
    }

    const {token} = await usersTokensRespository.generate(user.id);

    //futuramente vamos implementar o método de enviar isso para o email.
    console.log(token);
  }
}