import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

interface IRequest{
    id : string;
}

export default class DeleteProductService {
    public async execute({id}: IRequest) : Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findOne(id);
        
        if(!product){
            throw new AppError('Product not found');
        }
        await productsRepository.remove(product);
    }
}
