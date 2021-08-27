import { Router } from "express";
import { DatabaseError, validateRequest } from "@iagosrm/common";
import { IGardenUseCase } from "@application";
import { gardenSerializer } from "../serializers";
import { getGardenValidator } from "@presentation";

export const makeGardenRouter = (gardenUseCase: IGardenUseCase) => {
  const { getGardens, insertGarden } = gardenUseCase;

  const gardenRouter = Router();

  gardenRouter.get("/:userId", async (req, res, __) => {
    const userId = req.params.userId;
    try {
      const gardens = await getGardens(userId);
      res.status(200).json(gardens);
    } catch {
      throw new DatabaseError();
    }
  });

  gardenRouter.post(
    "/",
    getGardenValidator(),
    validateRequest,
    async (req, res, _) => {
      const garden = gardenSerializer(req.body);
      await insertGarden(garden);

      res.sendStatus(200);
    }
  );

  return gardenRouter;
};
