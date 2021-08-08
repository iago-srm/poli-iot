import { Garden, Snapshot, Measurement } from "@domain";
import { IDatabase } from "@infrastructure";
import { BadRequestError } from "@iagosrm/common";

enum TableNames {
  GARDEN = "gardens",
  SNAPSHOT = "snapshots",
  MEASUREMENT = "measurements",
}

export const GardenUseCase = (db: IDatabase) => {
  return {
    getGardens: (userId: string) =>
      db.getMany<Garden>(TableNames.GARDEN, { userId }),
    insertGarden: (garden: Garden) =>
      db.insert<Garden>(TableNames.GARDEN, garden),
  };
};

export type IGardenUseCase = ReturnType<typeof GardenUseCase>;

export const SnapshotUseCase = (db: IDatabase) => {
  return {
    getGarden: (gardenId: string) =>
      db.getById<Garden>(TableNames.GARDEN, gardenId),
    getSnapshot: (garden: Garden) => db.getOne(TableNames.SNAPSHOT, { garden }),
    insertSnapshot: (t: Snapshot | Snapshot[]) =>
      db.insert<Snapshot>(TableNames.SNAPSHOT, t),
    getMeasurements: (snapshot: Snapshot) =>
      db.getMany<Measurement>(TableNames.MEASUREMENT, { snapshot }),
  };
};

export type ISnapshotUseCase = ReturnType<typeof SnapshotUseCase>;

export const MeasurementUseCase = (db: IDatabase) => {
  return {
    getMeasurements: (snapshot: Snapshot) =>
      db.getMany<Measurement>(TableNames.MEASUREMENT, { snapshot }),
    // getMeasurementHistory: (limit: string) => {
    //   if (parseInt(limit))
    //     return db.getMany<Measurement>(TableNames.MEASUREMENT, parseInt(limit));
    //   throw new BadRequestError("pagination limit not good.");
    // },
    // insertMeasurement: (mes: Measurement | Measurement[]) =>
    //     db.insert<Measurement>(TableNames.MEASUREMENT, mes),
  };
};

export type IMeasurementUseCase = ReturnType<typeof MeasurementUseCase>;
