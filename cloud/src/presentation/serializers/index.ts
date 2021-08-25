import { Garden, Snapshot, Measurement } from "@domain";

export const gardenSerializer = (payload: any) => {
  const userId = payload.userId;
  const deviceNum = payload.deviceNum;
  const gardenName = payload.name;
  const description = payload.description;
  const gardenId = payload.gardenId;

  const garden = new Garden();

  garden.userId = userId;
  garden.name = gardenName;
  garden.description = description;
  garden.deviceNum = deviceNum;
  garden.id = gardenId;

  return garden;
};

export const snapshotSerializer = (payload: any, garden: Garden) => {
  const snapshot = new Snapshot();
  snapshot.garden = garden;
  snapshot.measurements = [];

  for (let i = 0; i < payload.snapshot.length; i++) {
    const measurement = new Measurement();
    measurement.deviceId = payload.snapshot[i].device;
    measurement.humidity = payload.snapshot[i].humidity;
    measurement.luminosity = payload.snapshot[i].luminosity;
    measurement.temperature = payload.snapshot[i].temperature;
    snapshot.measurements.push(measurement);
  }

  return snapshot;
};
