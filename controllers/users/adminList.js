const User = require("../../models/User");
const Ajv = require("ajv")
const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    headers: {
      type: "object",
      properties: {
        isdeleted: { type: "string", enum: ["true", "false"] },
      },
      required: ["isdeleted"],
      additionalProperties: true
    }
  },
  additionalProperties: true,
};

const controller = async (req, res, next) => {
  const { isdeleted } = req.headers;
  const users = await User.find({ type: "admin", isDeleted: isdeleted });
  // console.log("....", users);
  res.send(users);
};

module.exports = {controller, schema}


