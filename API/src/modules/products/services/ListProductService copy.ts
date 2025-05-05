import { getCustomRepository } from "typeorm";
import ProductRepository from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
export default class ListProductService {
    public async execute(): Promise<Product[]> {
        console.log("teste list");
        const productsRepository = getCustomRepository(ProductRepository);
        console.log("teste list 2");
        const products = await productsRepository.find();
        return products;
    }
}
