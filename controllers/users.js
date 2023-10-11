const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');
const nodeMailer = require('nodemailer');
const { type } = require('os');


exports.list = async (req, res, next) => {
  const users = await User.find({})
  // console.log("....", users);
  res.send(users)
};


exports.userList = async (req, res, next) => {
  const users = await User.find({type: "user"})
  // console.log("....", users);
  res.send(users)
};

exports.adminList = async (req, res, next) => {
  const users = await User.find({type: "admin"})
  // console.log("....", users);
  res.send(users)
};

exports.create = async (req, res, next) => {
  try {
    const { username, email, password, type } = req.body;

    //encrypt password
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create a new user with the provided data
    const user = await User.create({
      type,
      username,
      email,
      password: hashedPassword,
    });

    // Respond with the created user
    res.status(201).json({ user });
  } catch (error) {
    // Handle any errors that occur during user creation
    next(error);
  }
};

exports.verify = async (user) => {
  const data = User.find({ email: user.email });
  return data.password === user.password ? true : false;
}

exports.remove = async (req, res) => {
  const _id = req.params.id
  return User.deleteOne({ _id })
}

// exports.signIn = async (req, res) => {
//   const { username, email, password } = req.body;
//   const user = await User.findOne({ username });
//   if(user == null || !user) {
//     return res.status(401).send({match: false,  message: 'Incorrect username or password'});
//   }
//   const match = await user.matchPassword(password)
//   if (!match) {
//     // console.log('stopped..pass');
//     return res.status(401).send({match, message: 'Incorrect username or password'});
//   }
//   const _user = { ...user.toJSON() }
//   delete _user.password
//   // console.log('go');
//   return res.send({ match, user: _user })
// }

exports.edit = async (req, res, next) => {
  // console.log(req.params);
  const userId = req.params.id;
  const { username, email, password } = req.body;

  try {
    // Find the user by ID and update their information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
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

exports.forgetpassword = async (req, res) => {
  const {username, email} = req.body;
  const user = await User.findOne({ username });

  if(user.email === email) {
    return res.status(200).send(true);
  } else {
    return res.status(404).send('failed');
  }

  const html = `

  `
  async function sendMail () {
    const transporter = nodeMailer.createTransport({
      
    })
  }
}

exports.confirm = async (req, res) => {
  try {
    const { password } = req.body;
    const match = await User.matchSuperPassword(password)
    return res.send(match);
  }
  catch (error) {
  }

  return res.send(false)
}

exports.adminSignin = async (req, res) => {
  const { username, password } = req.body;
  const type = "admin";
  const admin = await User.findOne({ username, type })
  console.log('....123', username, password);
  if (!admin) {
    return res.status(404).send('Admin not found');
  }
  console.log('....admin found' );
  const match = await admin.matchPassword(password)
  if (!match) {
    return res.status(401).send('Incorrect password');
  }
  console.log('....pass found');
  const _admin = { ...admin.toJSON() }
  delete _admin.password
  return res.send({ match, admin: _admin })
}
