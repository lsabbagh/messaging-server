const User = require("../../models/User");
const Ajv = require("ajv");
const ajv = new Ajv();

// remove has no frontend code
// if else redo this page from the start 

const schema = {
  // type: "object",
  // properties: {
  //   params: {
  //     type: "object",
  //     properties: {},
  //     required: [],
  //     additionalProperties: true,
  //   },
  // },
  // required: [],
  // additionalProperties: true,
};

const controller = async (req, res) => {
  const _id = req.params.id;
  return User.deleteOne({ _id });
};

module.exports = { controller, schema };
