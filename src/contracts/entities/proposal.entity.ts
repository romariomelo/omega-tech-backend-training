import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Guid } from 'guid-typescript';
import { User } from './user.entity';

export enum Submercado {
  CONVENCIONAL = 'CONVENCIONAL',
  RENOVAVEL = 'RENOVAVEL',
}

export enum FonteEnergia {
  NORTE = 'NORTE',
  NORDESTE = 'NORDESTE',
  SUL = 'SUL',
  SUDESTE = 'SULDESTE',
}

@Entity()
export class Proposal {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({
    unique: true,
  })
  private publicId: string;

  @Column()
  private dataInicio: Date;

  @Column()
  private dataFim: Date;

  @Column({ nullable: true })
  cargar: number;

  @Column('text')
  submercado: Submercado;

  @Column('text')
  fonteEnergia: FonteEnergia;

  @Column()
  status: boolean;

  @OneToOne(() => User, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn()
  user: string;

  constructor() {
    this.publicId = Guid.create().toString();
  }
}
