import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

export default class CreateProductService {
    public async execute({
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        console.log("teste create 1");
        const productsExists = await productsRepository.findByName(name);
        console.log("teste create 2");
        if (productsExists) {
            throw new AppError("There is already one product with this name");
        }
        const product = productsRepository.create({ name, price, quantity });
        await productsRepository.save(product);
        return product;
    }
}
