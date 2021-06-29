import { Router } from "express";
import { DatabaseError, validateRequest } from "@iagosrm/common";
import {
  temperatureSerializer,
} from "@presentation";
import { IUserUseCase } from "@application";

export const makeTemperatureRouter = (userUseCase: IUserUseCase) => {
  const { getTemperature, insertTemperature } =
    userUseCase;

  const userRouter = Router();

  userRouter.get("/", async (_, res, __) => {
    try {
      // TODO: pagination
      // console.log(req.query.limit, req.query.offset); /users?limit=10&offset=5
      const allUsers = await getAllUsers();
      res.status(200).json(allUsers);
    } catch {
      throw new DatabaseError();
    }
  });

  userRouter.post(
    "/",
    validateRequest,
    async (req, res, _) => {
      const user = temperatureSerializer(req.body);

      await insertUser(user);

      res.sendStatus(200);
    }
  );

  return userRouter;
};
