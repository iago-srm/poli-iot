import { body, param, ValidationChain } from "express-validator";
import { GardenMessageNames, SnapshotMessageNames } from "../../locales";

export const getGardenValidator = () => {
  const gardenValidation: ValidationChain[] = [];
  gardenValidation.push(
    body("userId").exists().withMessage(GardenMessageNames.USERID.NOT_PROVIDED)
  );
  gardenValidation.push(
    body("name").exists().withMessage(GardenMessageNames.NAME.NOT_PROVIDED)
  );
  gardenValidation.push(
    body("deviceNum")
      .exists()
      .withMessage(GardenMessageNames.DEVICENUM.NOT_PROVIDED)
      .bail()
      .isNumeric()
      .withMessage(GardenMessageNames.DEVICENUM.NOT_A_NUMBER)
  );
  return [...gardenValidation];
};

export const getSnapshotValidator = () => {
  const snapshotValidation: ValidationChain[] = [];
  snapshotValidation.push(
    body("snapshot")
      .exists()
      .withMessage(SnapshotMessageNames.SNAPSHOT.NOT_PROVIDED)
      .bail()
      .isArray()
      .bail()
      .withMessage(SnapshotMessageNames.SNAPSHOT.NOT_A_LIST)
      .bail()
      .custom((snapshot) => {
        if (!snapshot.length) {
          return false;
        }
        return true;
      })
      .withMessage(SnapshotMessageNames.SNAPSHOT.LIST_EMPTY)
      .bail()
      .custom((snapshot) => {
        for (const measurement of snapshot) {
          if (
            !measurement.device ||
            !measurement.luminosity ||
            !measurement.temperature ||
            !measurement.temperature
          ) {
            return false;
          }
        }
        return true;
      })
      .withMessage(SnapshotMessageNames.SNAPSHOT.INVALID_FORMAT)
  );

  return [...snapshotValidation];
};
