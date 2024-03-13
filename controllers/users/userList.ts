import User from "../../models/User";
import Ajv from "ajv";
const ajv = new Ajv();

export const schema = {
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

export const controller = async (req, res, next) => {
  const { isdeleted } = req.headers;
  const users = await User.find({ type: "user", isDeleted: isdeleted });
  // console.log("....", users);
  res.send(users);
};

// module.exports = { controller, schema };
// export default { controller, schema }