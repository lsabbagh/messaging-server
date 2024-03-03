const User = require("../../models/User");
const Ajv = require("ajv");
// const addFormats = require("ajv-formats");
// const regex = require("../../utils/regex");
const ajv = new Ajv();
// addFormats(ajv);
const bcrypt = require("bcrypt");
const saltRounds = 10;

const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        type: { type: "string", enum: ["admin", "user"] },
      },
      required: ["username", "email", "password", "type"],
      additionalProperties: false,
    },
  },
  additionalProperties: true,
};

const controller = async (req, res, next) => {
  try {
    console.log(".... creating user...");
    const { username, email, password, type } = req.body;
    const isDeleted = false;

    // check for unique username and password
    // const oldUser = await User.find({ type: "user", username, email });
    // if (oldUser) {
    //   console.log('.... old user', { username, email });
    //   return res.status(406).json({ message: "username or email already in use" })
    // }
    // if(password.length<8){
    //   return res.status(500).json({Error: "password is short"})
    // }

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
    console.log(".... user created", _user);

    res.status(201).json({ _user });

  } catch (error) {
    res.status(500).send({ Error: error });
  }
};

module.exports = { controller, schema };
