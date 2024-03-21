import { beforeAll, afterAll, expect } from "vitest";
import createServer from "../src/createServer";
import supertest from "supertest";
require("dotenv").config({ path: "../config.env" });

// let appInstance;

// const createAppInstance = () => {
//   const { app, drop } = createServer();
//   appInstance = app;
//   return { app, drop };
// };

const { app, drop } = createServer();

const signin = async () => {
  //   const { app } = createAppInstance();
  const superTestApp = await supertest(app);
  global.app = superTestApp;
  const id = Date.now();

  const responseSuperAdmin = await superTestApp.post("/api/admin/login").send({
    username: "superadmin",
    password: process.env.SUPER_PASSWORD,
  });
  console.log(".... responseSuperAdmin", responseSuperAdmin.body);

  //   ADMIN CREATE
  try {
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
    console.log(".... responseCreateAdmin", responseCreateAdmin.body);

    global.admin = responseCreateAdmin.body._user;
    console.log(".... admin", responseCreateAdmin.body._user);
  } catch (error) {
    console.log(".... error..responseCreateAdmin", error);
  }

  const responselogout = await superTestApp
    .delete("/api/logout/573fgf9496zz7m7kkk7305f1")
    .send({ authtype: "cms" });
  console.log(".... responselogout", responselogout.body);
  expect(responselogout.status).to.equal(200)
  expect(responselogout.body).to.deep.equal({message: "Logout Successful"})

  const responseLoginadmin = await superTestApp.post("/api/admin/login").send({
    username: global.admin.username,
    password: "this-is-test-password",
  });
  console.log(".... responseLoginadmin", responseLoginadmin.body);
  global.token = responseLoginadmin.body.token;

//   console.log(".... global", global);

//   const newUser = {
//     username: "user-" + id,
//     email: "user-" + id + "@gmail.com",
//     password: "this-is-test-password",
//     type: "user",
//   };

  // const responseCreatedAdmin = await superTestApp
  //     .post('/api/users/')
  //     .send(newUser)

  // const userCreated = responseCreatedAdmin.body

  // console.log('.....', { userCreated })

  // const responseLogin = await superTestApp
  //     .post('/api/login/')
  //     .send({
  //         username: newAdmin.username,
  //         password: newAdmin.password
  //     })

  // // TODO: fix this, login must go here
  // console.log('....login: ', responseLogin.body)
  // global.token = responseLogin.body.token
};

beforeAll(async () => {
  await signin()
});

afterAll(async () => {
  drop();
});

// export const globalSetup = async () => {
//     await signin();
//   };

//   export const globalTeardown = () => {
//     if (appInstance) {
//       appInstance.drop();
//     }
//   };
