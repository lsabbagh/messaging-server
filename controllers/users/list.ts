import User from "../../models/User";
import Ajv from "ajv";
const ajv = new Ajv()

export const schema = {}

export const controller = async (req, res, next) => {
  const users = await User.find({ isDeleted: false });
  console.log("....controller..users..list", users);
  
  res.send(users);
};

