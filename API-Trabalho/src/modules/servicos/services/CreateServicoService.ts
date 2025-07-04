import { getRepository } from "typeorm";
import Servico from "../typeorm/entities/Servico";

interface IRequest {
    nome: string;
    descricao: string;
    valor: number;
    status?: string;
    data_entrada: Date;
    data_saida?: Date;
    tecnico_id: string;
}

export default class CreateServicoService {
    public async execute({
        nome,
        descricao,
        valor,
        status = "pendente",
        data_entrada,
        data_saida,
        tecnico_id,
    }: IRequest): Promise<Servico> {
        const servicoRepository = getRepository(Servico);

        const servico = servicoRepository.create({
            nome,
            descricao,
            valor,
            status,
            data_entrada,
            data_saida,
            tecnico_id,
        });

        await servicoRepository.save(servico);
        return servico;
    }
}
