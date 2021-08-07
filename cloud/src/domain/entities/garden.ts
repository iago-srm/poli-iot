import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Snapshot } from "@domain";

@Entity("gardens")
export class Garden {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((_) => Snapshot, (snapshot) => snapshot.garden)
  snapshots: Snapshot[];

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  userId: string;

  @Column()
  deviceNum: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt?: Date;
}
