import { Request, Response, NextFunction } from "express";
import CreateServicoService from "../services/CreateServicoService";
import {
    ListServicosService,
    UpdateServicoService,
    DeleteServicoService,
} from "../services/CrudServicoService";

export default class ServicoController {
    public async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const { nome, descricao, valor, status, data_entrada, data_saida } =
                req.body;
            const tecnico_id = req.user.id;

            const createServico = new CreateServicoService();
            const servico = await createServico.execute({
                nome,
                descricao,
                valor,
                status,
                data_entrada: data_entrada
                    ? new Date(data_entrada)
                    : new Date(),
                data_saida: data_saida ? new Date(data_saida) : undefined,
                tecnico_id,
            });

            return res.status(201).json(servico);
        } catch (error) {
            next(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    public async list(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const tecnico_id = req.user.id; 

            const listServicos = new ListServicosService();
            const servicos = await listServicos.execute(tecnico_id);

            return res.json(servicos);
        } catch (error) {
            next(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    public async update(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const tecnico_id = req.user.id; // ID do usuário autenticado
            const { id } = req.params;
            const { nome, descricao } = req.body;

            const updateServico = new UpdateServicoService();
            const servico = await updateServico.execute(id, tecnico_id, {
                nome,
                descricao,
            });

            if (!servico)
                return res
                    .status(404)
                    .json({ error: "Serviço não encontrado" });

            return res.json(servico);
        } catch (error) {
            next(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    public async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const tecnico_id = req.user.id; 
            const { id } = req.params;

            const deleteServico = new DeleteServicoService();
            const deleted = await deleteServico.execute(id, tecnico_id);

            if (!deleted)
                return res
                    .status(404)
                    .json({ error: "Serviço não encontrado" });

            return res.status(204).send();
        } catch (error) {
            next(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    public async updateByNome(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const tecnico_id = req.user.id;
            const { nome } = req.params;
            const { descricao, valor, status, data_entrada, data_saida } =
                req.body;
            const servicoRepository = require("typeorm").getRepository(
                require("../typeorm/entities/Servico").default
            );
            const servico = await servicoRepository.findOne({
                where: { nome, tecnico_id },
            });
            if (!servico)
                return res
                    .status(404)
                    .json({ error: "Serviço não encontrado" });
            if (descricao !== undefined) servico.descricao = descricao;
            if (valor !== undefined) servico.valor = valor;
            if (status !== undefined) servico.status = status;
            if (data_entrada !== undefined)
                servico.data_entrada = new Date(data_entrada);
            if (data_saida !== undefined)
                servico.data_saida = new Date(data_saida);
            await servicoRepository.save(servico);
            return res.json(servico);
        } catch (error) {
            next(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    public async deleteByNome(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const tecnico_id = req.user.id;
            const { nome } = req.params;
            const servicoRepository = require("typeorm").getRepository(
                require("../typeorm/entities/Servico").default
            );
            const servico = await servicoRepository.findOne({
                where: { nome, tecnico_id },
            });
            if (!servico)
                return res
                    .status(404)
                    .json({ error: "Serviço não encontrado" });
            await servicoRepository.delete(servico.id);
            return res.status(204).send();
        } catch (error) {
            next(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    public async updateByCodigo(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const tecnico_id = req.user.id;
            const { codigo } = req.params;
            const { nome, descricao, valor, status, data_entrada, data_saida } =
                req.body;
            const servicoRepository = require("typeorm").getRepository(
                require("../typeorm/entities/Servico").default
            );
            const servico = await servicoRepository.findOne({
                where: { codigo: Number(codigo), tecnico_id },
            });
            if (!servico)
                return res
                    .status(404)
                    .json({ error: "Serviço não encontrado" });
            if (nome !== undefined) servico.nome = nome;
            if (descricao !== undefined) servico.descricao = descricao;
            if (valor !== undefined) servico.valor = valor;
            if (status !== undefined) servico.status = status;
            if (data_entrada !== undefined)
                servico.data_entrada = new Date(data_entrada);
            if (data_saida !== undefined)
                servico.data_saida = new Date(data_saida);
            await servicoRepository.save(servico);
            return res.json(servico);
        } catch (error) {
            next(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    public async deleteByCodigo(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const tecnico_id = req.user.id;
            const { codigo } = req.params;
            const servicoRepository = require("typeorm").getRepository(
                require("../typeorm/entities/Servico").default
            );
            const servico = await servicoRepository.findOne({
                where: { codigo: Number(codigo), tecnico_id },
            });
            if (!servico)
                return res
                    .status(404)
                    .json({ error: "Serviço não encontrado" });
            await servicoRepository.delete(servico.id);
            return res.status(204).send();
        } catch (error) {
            next(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    public async listUserWithServicos(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const tecnico_id = req.user.id;
            const userRepository = require("typeorm").getRepository(
                require("@modules/users/typeorm/entities/User").default
            );
            const user = await userRepository.findOne({
                where: { id: tecnico_id },
                relations: ["servicos"],
            });
            if (!user)
                return res
                    .status(404)
                    .json({ error: "Usuário não encontrado" });
            // Remover senha do retorno
            const { password, ...userSafe } = user;
            return res.json(userSafe);
        } catch (error) {
            next(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
