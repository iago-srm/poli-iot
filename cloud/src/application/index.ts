import { Garden, Snapshot, Measurement } from "@domain";
import { IDatabase } from "@infrastructure";

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
    getGarden: (garden: Garden) =>
      db.getById<Garden>(TableNames.GARDEN, garden.id.toString()),
    getSnapshot: (garden: Garden) =>
      db.getLast<Snapshot>(TableNames.SNAPSHOT, { garden }),
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
  };
};

export type IMeasurementUseCase = ReturnType<typeof MeasurementUseCase>;
