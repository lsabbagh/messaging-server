import User from "../../models/User";
import Ajv from "ajv";
const ajv = new Ajv();

export const schema = {
  // type: "object",
  //     properties: {

  //     },
  //     required: [],
  //     additionalProperties: true
};

export const controller = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });
  console.log("....user", user);

  const profileData = {
    profilePic: user.profilePic,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  console.log("....profileData", profileData);
  
  res.status(201).send(profileData);
};

