import { getRepository } from "typeorm";
import Servico from "../typeorm/entities/Servico";

interface ICreateServicoRequest {
    nome: string;
    descricao: string;
    tecnico_id: string;
}

export default class CreateServicoService {
    public async execute({
        nome,
        descricao,
        tecnico_id,
    }: ICreateServicoRequest): Promise<Servico> {
        const servicoRepository = getRepository(Servico);
        const servico = servicoRepository.create({
            nome,
            descricao,
            tecnico_id,
        });
        await servicoRepository.save(servico);
        return servico;
    }
}

export class ListServicosService {
    public async execute(tecnico_id: string): Promise<Servico[]> {
        const servicoRepository = getRepository(Servico);
        return servicoRepository.find({ where: { tecnico_id } });
    }
}

export class UpdateServicoService {
    public async execute(
        id: string,
        tecnico_id: string,
        data: Partial<Servico>
    ): Promise<Servico | undefined> {
        const servicoRepository = getRepository(Servico);
        const servico = await servicoRepository.findOne({
            where: { id, tecnico_id },
        });
        if (!servico) return undefined;
        Object.assign(servico, data);
        await servicoRepository.save(servico);
        return servico;
    }
}

export class DeleteServicoService {
    public async execute(id: string, tecnico_id: string): Promise<boolean> {
        const servicoRepository = getRepository(Servico);
        const result = await servicoRepository.delete({ id, tecnico_id });
        return result.affected === 1;
    }
}
