import { Temperature } from "../../domain";

export const temperatureSerializer = (payload: any) => {
  const deviceId = payload.deviceId;
  const time = payload.time;
  const value = payload.value;

  const temperature = new Temperature();

  temperature.deviceId = deviceId;
  temperature.time = time;
  temperature.value = value;

  return temperature;
};
