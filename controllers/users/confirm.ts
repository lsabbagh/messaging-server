// const User = require("../../models/User");
// const Ajv = require("ajv");
import Ajv from "ajv";
import User from "../../models/User"
const ajv = new Ajv();

export const schema = {
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

export const controller = async (req, res) => {
  try {
    const { password } = req.body;
    console.log("....confirm....confirm....confirm...");

    const match = await User.matchSuperPassword(password);
    console.log("....isConfirmed", match);

    return res.send(match);

  } catch (error) {
    console.log(error);
    return res.status(500).send({success: false})
  }
  
};
