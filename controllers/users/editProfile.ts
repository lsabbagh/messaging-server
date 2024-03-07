import User from "../../models/User";
import Ajv from "ajv";
const ajv = new Ajv();

export const schema = {
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

export const controller = async (req, res) => {
  const { id } = req.params;
  let { profilePic, firstName, lastName } = req.body;

  if (!profilePic || profilePic == undefined || profilePic == null) {
    return (profilePic = "https://imgur.com/a/X3TMJ7a");
  }

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
    res.status(500).send({ success: false });
  }
};

