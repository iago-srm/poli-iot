import { Garden, Snapshot } from "@domain";

export const gardenSerializer = (payload: any) => {
  const userId = payload.userId;
  const deviceNum = payload.deviceNum;
  const gardenName = payload.name;
  const description = payload.description;

  const garden = new Garden();

  garden.userId = userId;
  garden.name = gardenName;
  garden.description = description;
  garden.deviceNum = deviceNum;

  return garden;
};

export const snapshotSerializer = (_: any) => {
  const snapshot = new Snapshot();
  return snapshot;
};
