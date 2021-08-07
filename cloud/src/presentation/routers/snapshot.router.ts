import { Router } from "express";
import { DatabaseError, validateRequest } from "@iagosrm/common";
import { ISnapshotUseCase } from "@application";
import { snapshotSerializer } from "../serializers";
import { Measurement, Snapshot } from "@domain";

export const makeSnapshotRouter = (snapshotUseCase: ISnapshotUseCase) => {
  const { getSnapshot, insertSnapshot, getGarden, getMeasurements } =
    snapshotUseCase;

  const snapshotRouter = Router();

  snapshotRouter.get("/:gardenId", async (req, res, __) => {
    const gardenId = req.params.gardenId;
    const garden = await getGarden(gardenId);
    try {
      const snapshot = garden && (await getSnapshot(garden));
      const measurements = await getMeasurements(snapshot[0]);
      res.status(200).json({
        id: snapshot[0].id,
        time: snapshot[0].createdAt,
        measurements,
      });
    } catch {
      throw new DatabaseError();
    }
  });

  snapshotRouter.post("/:gardenId", validateRequest, async (req, res, _) => {
    const gardenId = req.params.gardenId;
    const garden = await getGarden(gardenId);
    const snapshot = new Snapshot();
    if (garden) snapshot.garden = garden;
    snapshot.measurements = [];
    for (let i = 0; i < req.body.snapshot.length; i++) {
      const measurement = new Measurement();
      measurement.deviceId = req.body.snapshot[i].device;
      measurement.humidity = req.body.snapshot[i].humidity;
      measurement.luminosity = req.body.snapshot[i].luminosity;
      measurement.temperature = req.body.snapshot[i].temperature;
      snapshot.measurements.push(measurement);
    }

    // const snapshot = snapshotSerializer(req.body);
    await insertSnapshot(snapshot);

    res.sendStatus(200);
  });

  return snapshotRouter;
};
