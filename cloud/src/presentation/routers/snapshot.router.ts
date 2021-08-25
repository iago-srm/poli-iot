import { Router } from "express";
import {
  DatabaseError,
  BadRequestError,
  validateRequest,
} from "@iagosrm/common";
import { ISnapshotUseCase } from "@application";
import { snapshotSerializer, gardenSerializer } from "../serializers";
import { Measurement, Snapshot } from "@domain";

export const makeSnapshotRouter = (snapshotUseCase: ISnapshotUseCase) => {
  const { getSnapshot, insertSnapshot, getGarden, getMeasurements } =
    snapshotUseCase;

  const snapshotRouter = Router();

  const _getGarden = async (req) => {
    const reqGarden = gardenSerializer(req.params);
    const garden = await getGarden(reqGarden);
    if (!garden) {
      throw new BadRequestError("Could not find garden.");
    }
    return garden;
  };

  snapshotRouter.get("/:gardenId", async (req, res, __) => {
    const garden = await _getGarden(req);
    let snapshot: Snapshot;

    try {
      snapshot = await getSnapshot(garden);
    } catch (e) {
      throw new DatabaseError(e.message);
    }

    if (!snapshot)
      throw new BadRequestError("This garden has no snapshots yet");

    let measurements: Measurement[];
    try {
      measurements = await getMeasurements(snapshot);
      res.status(200).json({
        id: snapshot.id,
        time: snapshot.createdAt,
        measurements,
      });
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  });

  snapshotRouter.post("/:gardenId", validateRequest, async (req, res, _) => {
    const garden = await _getGarden(req);

    const snapshot = snapshotSerializer(req.body, garden);

    try {
      await insertSnapshot(snapshot);
    } catch (e) {
      throw new DatabaseError(e.message);
    }

    res.sendStatus(200);
  });

  return snapshotRouter;
};
