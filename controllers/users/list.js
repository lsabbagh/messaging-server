const User = require("../../models/User");
const Ajv = require("ajv")
const ajv = new Ajv()

const schema = {}

const controller = async (req, res, next) => {
  const users = await User.find({ isDeleted: false });
  console.log("....controller..users..list", users);
  res.send(users);
};


module.exports = {controller, schema}