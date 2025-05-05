import productsRouter from "@modules/products/routes/products.routes";
import { response, Router } from "express";

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
