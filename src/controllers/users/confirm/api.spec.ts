import { it, expect } from "vitest";
require("dotenv").config({ path: "../config.env" });

it.skip("will change the admins password", async () => {
  const token = global.token;
  const id = global.admin?._id;
  console.log(".... confirm ..id..token..", { token, id });
  // console.log(".... global...........app", global);

  const response = global.app
    .post("/api/users/changePassword/user")
    .send({ password: process.env.SUPER_PASSWORD, })
    .set("token", token)
    .set("authtype", "cms")

  console.log(".... response...test.spec.ts....confirm", response?.body);

  // expect(response.status).to.equal(200);
  // expect(response.body).to.deep.equal({ success: true });
});
