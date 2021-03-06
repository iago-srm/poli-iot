import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  AwilixContainer,
} from "awilix";
import { errorHandler, startPolyglot } from "@iagosrm/common";
import {
  GardenUseCase,
  MeasurementUseCase,
  SnapshotUseCase,
} from "@application";
import { makeGardenRouter, makeSnapshotRouter } from "@presentation";
import { Database } from "@infrastructure";
import { Application } from "./app";
import { Messages } from "@locales";
import { dbConnectionNames } from "../ormconfig.enum";

export enum MiddlewareNames {
  json = "json",
  polyglot = "polyglot",
  errorHandler = "errorHandler",
}

export enum Dependencies {
  APP = "app",
  DB = "db",
}

const rootContainer = createContainer();

rootContainer.register({
  db: asClass(Database)
    .singleton()
    .disposer(async (db) => await db.closeConnection()),
  [Dependencies.APP]: asClass(Application)
    .singleton()
    .disposer(async (app) => await app._server.close()),
  middleware: asValue({
    [MiddlewareNames.errorHandler]: errorHandler,
    [MiddlewareNames.polyglot]: startPolyglot(Messages),
  }),

  // register use cases
  gardenUseCase: asFunction(GardenUseCase).classic(),
  measurementUseCase: asFunction(MeasurementUseCase).classic(),
  snapshotUseCase: asFunction(SnapshotUseCase).classic(),

  // register routers
  gardenRouter: asFunction(makeGardenRouter).classic(),
  snapshotRouter: asFunction(makeSnapshotRouter).classic(),
});

const container = rootContainer.createScope();
const testContainer = rootContainer.createScope();

const devContainerConfig = {
  dbConnectionName: dbConnectionNames.DEVELOPMENT,
};

const prodContainerConfig = {
  dbConnectionName: dbConnectionNames.PRODUCTION,
};

const testContainerConfig = {
  dbConnectionName: dbConnectionNames.TEST,
};

const registerScopeDependencies = (
  scopeContainer: AwilixContainer,
  config: any
) => {
  scopeContainer.register({
    dbConnectionName: asValue(config.dbConnectionName),
  });
};

registerScopeDependencies(
  container,
  process.env.NODE_ENV === "production"
    ? prodContainerConfig
    : devContainerConfig
);

registerScopeDependencies(testContainer, testContainerConfig);

export { container as devContainer, testContainer };
