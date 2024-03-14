import User from "../../models/User";
import Ajv from "ajv";
const ajv = new Ajv();
import bcrypt from "bcrypt";
const saltRounds = 10;

export const schema = {
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

export const controller = async (req, res) => {
  try {
    const { id, password } = req.body;

    if(password.length<8){
      return res.status(500).json({Error: "password should be at least 8 characters"})
    }

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

