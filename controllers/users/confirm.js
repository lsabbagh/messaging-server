const User = require("../../models/User");
const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        password: { type: "string" },
      },
      required: ["password"],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};

const controller = async (req, res) => {
  try {
    const { password } = req.body;
    console.log("....confirm....confirm....confirm...");
    const match = await User.matchSuperPassword(password);
    console.log("....isConfirmed", match);
    return res.send(match);
  } catch (error) {}

  return res.send(false);
};

module.exports = {controller, schema}