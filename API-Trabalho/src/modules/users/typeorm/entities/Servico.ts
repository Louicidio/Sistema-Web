import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import User from './User';

@Entity('servicos')
export default class Servico {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  descricao!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor!: number;

  @Column({ 
    type: 'varchar',
    enum: ['pendente', 'em_andamento', 'concluido'],
    default: 'pendente'
  })
  status!: string;

  @Column({ name: 'data_entrada' })
  dataEntrada!: Date;

  @Column({ name: 'data_saida', nullable: true })
  dataSaida?: Date;

  @ManyToOne(() => User, (user) => user.servicos)
  @JoinColumn({ name: 'tecnico_id' }) 
  tecnico!: User;


  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}