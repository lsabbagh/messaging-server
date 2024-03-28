import { it, expect } from "vitest";

it("will change the admins password", async () => {
  const token = global.token;
  const id = global.admin?._id;
  // console.log(".... change password..id..token..", { token, id });
  // console.log(".... global...........app", global);

  const response = await global.superTestApp
    .post("/api/users/changePassword/user")
    .send({ id, password: "new-password" })
    .set("token", token)
    .set("authtype", "cms")

  console.log(".... change password...response", response.body);

  // expect(response.status).to.equal(200);
  // expect(response.body).to.deep.equal({ success: true });
});
