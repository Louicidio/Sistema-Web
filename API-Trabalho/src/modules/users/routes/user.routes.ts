import { Router } from "express";
import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";
import PasswordController from "../controllers/PasswordController";
import isAuthenticated from "@shared/http/middleware/isAuthenticated";

const userRouter = Router();
const userController = new UserController();
const sessionController = new SessionController();
const passwordController = new PasswordController();

// Rota PÚBLICA (sem autenticação) - Criação de usuário
userRouter.post("/", (req, res, next) => {
    userController.create(req, res, next);
});

// Rota PÚBLICA (sem autenticação) - Autenticação e geração do token JWT
userRouter.post("/sessions", (req, res, next) => {
    sessionController.create(req, res, next);
});

// Solicitar reset de senha
userRouter.post("/forgot-password", (req, res, next) => {
    passwordController.forgot(req, res, next);
});

// Redefinir senha
userRouter.post("/reset-password", (req, res, next) => {
    passwordController.reset(req, res, next);
});

// Rotas PROTEGIDAS (requerem JWT)
userRouter.get("/", isAuthenticated, (req, res, next) => {
    userController.index(req, res, next);
});

userRouter.get("/profile", isAuthenticated, (req, res, next) => {
    userController.updateProfile(req, res, next);
});

// Atualizar o próprio usuário autenticado
userRouter.put("/profile", isAuthenticated, (req, res, next) => {
    userController.updateProfile(req, res, next);
});

// Deletar o próprio usuário autenticado
userRouter.delete("/profile", isAuthenticated, (req, res, next) => {
    userController.deleteProfile(req, res, next);
});

export default userRouter;
