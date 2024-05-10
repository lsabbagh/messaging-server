import User from "../../../models/User";
import bcrypt from "bcrypt";
const saltRounds = 10;


export default async (req, res) => {
  try {
    const { id, password } = req.body;

    if (password.length < 8) {
      return res.status(500).json({ Error: "password should be at least 8 characters" })
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

