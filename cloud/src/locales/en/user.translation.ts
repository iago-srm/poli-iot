import { SnapshotMessageNames, GardenMessageNames } from "../messages.enum";

export const English = {
  [SnapshotMessageNames.SNAPSHOT.INVALID_FORMAT]:
    "Please, check the names of the measurements",
  [SnapshotMessageNames.SNAPSHOT.LIST_EMPTY]:
    "The snapshot list cannot be empty",
  [SnapshotMessageNames.SNAPSHOT.NOT_A_LIST]:
    "The property snapshot must be a list",
  [SnapshotMessageNames.SNAPSHOT.NOT_PROVIDED]:
    "Plase, provide a snapshot property",
  [GardenMessageNames.DEVICENUM.NOT_A_NUMBER]:
    "The property deviceNum must be a number",
  [GardenMessageNames.DEVICENUM.NOT_PROVIDED]:
    "Plase, provide a deviceNum property",
  [GardenMessageNames.NAME.NOT_PROVIDED]: "Plase, provide a name property",
  [GardenMessageNames.USERID.NOT_PROVIDED]: "Plase, provide a userId property",
};
