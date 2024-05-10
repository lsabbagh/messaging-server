import supertest from "supertest";

import createExpressApp from "src/createExpressApp";
import getMongooseConnection from "db/getMongooseConnection";

import dotenv from "dotenv";

dotenv.config();

const signin = async (dbName) => {
  try {
    const expressApp = createExpressApp()

    const dbURI = 'mongodb://localhost:27017/' + dbName

    const mongooseConnection = await getMongooseConnection(dbURI, dbName)
    mongooseConnection.db.dropDatabase()

    const superTestApp = await supertest(expressApp);
    const id = Date.now();

    const responseSuperAdmin = await superTestApp.post("/api/admin/login")
    .send({
      username: "superadmin",
      password: process.env.SUPER_PASSWORD,
    });

    const responseCreateAdmin = await superTestApp
      .post("/api/users/")
      .set("token", responseSuperAdmin.body.token)
      .set("authtype", "cms")
      .send({
        username: "user-" + id,
        email: "user-" + id + "@gmail.com",
        password: "this-is-test-password",
        type: "admin",
      });

    const admin = responseCreateAdmin.body._user;

    const responseLoginadmin = await superTestApp.post("/api/admin/login")
      .send({
      username: admin.username,
      password: "this-is-test-password",
    });

    const token = responseLoginadmin.body.token;

    return {superTestApp, token, admin, mongooseConnection }
  } catch (error) {
    console.log(".... error..responseCreateAdmin", error);
  }

};

export default signin
