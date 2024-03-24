import User from "../../../models/User";
import bcrypt from "bcrypt";
const saltRounds = 10;



export default async (req, res, next) => {
  try {
    const { username, email, password, type } = req.body;
    const isDeleted = false;

    // check for unique username and password length
    // who should handle username uniquiness DB or NODE

    if (password.length < 8) {
      return res.status(500).json({ Error: "password should be at least 8 characters" })
    }

    //encrypt password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the provided data
    const user = await User.create({
      type,
      username,
      email,
      password: hashedPassword,
      isDeleted,
    });

    const _user = { ...user.toJSON() };
    delete _user.password

    res.status(201).json({ _user });

  } catch (error) {
    res.status(500).send({ Error: error });
  }
};

