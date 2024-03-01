const User = require("../../models/User");
const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        id: { type: "string" },
        password: { type: "string" },
      },
      required: ["id", "password"],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};

const controller = async (req, res) => {
  try {
    const { id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true } // This option returns the updated user data
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.send({ success: false });
  }
};

module.exports = { controller, schema };
