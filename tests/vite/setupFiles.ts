import { beforeAll, afterAll } from "vitest";
import { Connection } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import signin from "./signin";

let _mongooseConnection: Connection
beforeAll(async ({ name }) => {
  const dbName = getDbNameFromTestFile(name)
  const response = await signin(dbName)
  const {superTestApp,  token, admin, mongooseConnection } = response
  Object.assign(global, {superTestApp,  token, admin} )
  _mongooseConnection = mongooseConnection
});

afterAll(async () => {
  _mongooseConnection?.db?.dropDatabase?.()
});

const getDbNameFromTestFile = name => name.replace(/\/|\./g, '_')