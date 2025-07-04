import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import User from "@modules/users/typeorm/entities/User";

@Entity("servicos")
export default class Servico {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: false })
    nome!: string;

    @Column()
    descricao!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    valor!: number;

    @Column({ default: "pendente" })
    status!: string;

    @Column({ type: "timestamp" })
    data_entrada!: Date;

    @Column({ type: "timestamp", nullable: true })
    data_saida?: Date;

    @Column()
    tecnico_id!: string;

    @Column({ unique: true, generated: "increment", type: "int" })
    codigo!: number;

    @ManyToOne(() => User, (user) => user.servicos)
    @JoinColumn({ name: "tecnico_id" })
    tecnico!: User;

    @Column({ type: "timestamp", default: () => "now()" })
    created_at!: Date;

    @Column({ type: "timestamp", default: () => "now()" })
    updated_at!: Date;
}
