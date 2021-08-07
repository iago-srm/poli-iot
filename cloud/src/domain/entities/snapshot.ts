import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Garden, Measurement } from "@domain";

@Entity("snapshots")
export class Snapshot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_) => Garden, (garden) => garden.snapshots)
  garden: Garden;

  @OneToMany((_) => Measurement, (measurement) => measurement.snapshot, {
    cascade: true,
  })
  measurements: Measurement[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt?: Date;
}
