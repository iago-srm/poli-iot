import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";

export abstract class Measure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceId: string;

  @Column()
  value: number;

  @Column()
  time: string;

  @CreateDateColumn({type: "timestamp"})
  createdAt?: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt?: Date;
}

@Entity("temperatures")
export class Temperature extends Measure{}


@Entity("luminosities")
export class Luminosity extends Measure{}


@Entity("humidities")
export class Humidity extends Measure{}