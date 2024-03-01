const User = require("../../models/User");
const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        email: { type: "string" },
        isDeleted: { type: "string", enum: ["true", "false"] },
      },
      required: ["username", "email", "isDeleted"],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};

const controller = async (req, res, next) => {
  // console.log(req.params);
  const userId = req.params.id;
  const { username, email, isDeleted } = req.body;

  try {
    // Find the user by ID and update their information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, isDeleted },
      { new: true } // This option returns the updated user data
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the updated user data
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    res.send({ success: false });
  }
};

module.exports = { controller, schema };
