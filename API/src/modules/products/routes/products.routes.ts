import { Router } from "express";
import ProductsController from "../controllers/ProductsController";
import { celebrate, Segments, Joi } from "celebrate";

const productsRouter = Router();
const productController = new ProductsController();

productsRouter.get("/", async (req, res, next) => {
    try {
        await productController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});
productsRouter.get(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    async (req, res, next) => {
        try {
            await productController.show(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);
productsRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).min(0).required(),
            quantity: Joi.number().min(0).required(),
        },
    }),
    async (req, res, next) => {
        try {
            await productController.create(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

productsRouter.put(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            id: Joi.string().uuid().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
    }),
    async (req, res, next) => {
        try {
            await productController.update(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);
productsRouter.delete(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    async (req, res, next) => {
        try {
            await productController.delete(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

export default productsRouter;
