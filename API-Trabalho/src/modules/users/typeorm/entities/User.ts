import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import Servico from "../entities/Servico";

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true })
    username!: string; 

    @Column()
    name!: string; 

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string; 

    @Column({
        type: "varchar",
        enum: ["admin", "mecanico", "atendente"], 
    })
    funcao!: string; 

    @OneToMany(() => Servico, (servico: Servico) => servico.tecnico)
    servicos!: Servico[];

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
}
