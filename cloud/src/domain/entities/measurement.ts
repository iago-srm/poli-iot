import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Snapshot } from "@domain";

@Entity("measurements")
export class Measurement {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne((_) => Device, (device) => device.measurements)
  // device: Device;

  @ManyToOne((_) => Snapshot, (snapshot) => snapshot.measurements)
  snapshot: Snapshot;

  @Column()
  deviceId: number;

  @Column()
  temperature: number;

  @Column()
  humidity: number;

  @Column()
  luminosity: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt?: Date;
}
