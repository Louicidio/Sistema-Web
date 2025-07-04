import { Router } from "express";
import ServicoController from "../controllers/ServicoController";
import isAuthenticated from "@shared/http/middleware/isAuthenticated";

const servicoRouter = Router();
const servicoController = new ServicoController();

// Rota para criar serviço (associado ao usuário autenticado)
servicoRouter.post("/", isAuthenticated, (req, res, next) => {
    servicoController.create(req, res, next).catch(next);
});

// Listar todos os serviços do usuário autenticado
servicoRouter.get("/", isAuthenticated, (req, res, next) => {
    servicoController.list(req, res, next).catch(next);
});

// Atualizar serviço do usuário autenticado
servicoRouter.put("/:id", isAuthenticated, (req, res, next) => {
    servicoController.update(req, res, next).catch(next);
});

// Deletar serviço do usuário autenticado
servicoRouter.delete("/:id", isAuthenticated, (req, res, next) => {
    servicoController.delete(req, res, next).catch(next);
});

// Atualizar serviço pelo nome
servicoRouter.put("/nome/:nome", isAuthenticated, (req, res, next) => {
    servicoController.updateByNome(req, res, next).catch(next);
});

// Deletar serviço pelo nome
servicoRouter.delete("/nome/:nome", isAuthenticated, (req, res, next) => {
    servicoController.deleteByNome(req, res, next).catch(next);
});

// Atualizar serviço pelo código
servicoRouter.put("/codigo/:codigo", isAuthenticated, (req, res, next) => {
    servicoController.updateByCodigo(req, res, next).catch(next);
});

// Deletar serviço pelo código
servicoRouter.delete("/codigo/:codigo", isAuthenticated, (req, res, next) => {
    servicoController.deleteByCodigo(req, res, next).catch(next);
});

// Listar usuário autenticado e seus serviços
servicoRouter.get("/me", isAuthenticated, (req, res, next) => {
    servicoController.listUserWithServicos(req, res, next).catch(next);
});

export default servicoRouter;
