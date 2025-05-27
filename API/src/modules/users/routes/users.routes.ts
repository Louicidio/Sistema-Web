import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../controllers/UsersController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import multer from "multer";
import uploadConfig from "@config/upload";
import UsersAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();
const upload = multer({storage: uploadConfig.storage});
usersRouter.get("/", isAuthenticated, async(req, res, next) => {
    try {
        await usersController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

usersRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    async (req, res, next) => {
        try {
            await usersController.create(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);
usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      await usersAvatarController.update(req, res);
    } catch (err) {
      next(err);
    }
  }
);

export default usersRouter;
