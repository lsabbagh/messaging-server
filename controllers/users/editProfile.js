const User = require("../../models/User");
const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        profilePic: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
      },
      required: ["profilePic", "firstName", "lastName"],
      additionalProperties: true,
    },
    // params : {}
  },
  required: [],
  additionalProperties: true,
};

const controller = async (req, res) => {
  const { id } = req.params;
  let { profilePic, firstName, lastName } = req.body;

  if (!profilePic || profilePic == undefined || profilePic == null)
    return (profilePic = "https://imgur.com/a/X3TMJ7a");

  try {
    const updatedData = await User.findByIdAndUpdate(
      id,
      { profilePic, firstName, lastName },
      { new: true } // This option returns the updated user data
    );

    if (!updatedData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ updatedData: updatedData });
  } catch (error) {
    console.log(error);
    res.send({ success: false });
  }

  // const user = await User.findOne({ _id: id })
  // console.log('....user', user);
  // const profileData = {
  //   profilePic: user.profilePic,
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  // }
  // console.log('....profileData', profileData);
  // res.status(201).send(profileData);
};

module.exports = { controller, schema };
