const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");
const nodeMailer = require("nodemailer");
const { type } = require("os");
require('dotenv').config()

exports.list = async (req, res, next) => {
  const users = await User.find({ isDeleted: false });
  // console.log("....", users);
  res.send(users);
};

exports.userList = async (req, res, next) => {
  const { isdeleted } = req.headers;
  const isDeleted = isdeleted == "false" ? false : true;
  const users = await User.find({ type: "user", isDeleted });
  // console.log("....", users);
  res.send(users);
};

exports.adminList = async (req, res, next) => {
  const { isdeleted } = req.headers;
  const isDeleted = isdeleted == "false" ? false : true;
  const users = await User.find({ type: "admin", isDeleted });
  // console.log("....", users);
  res.send(users);
};

exports.create = async (req, res, next) => {
  try {
    const { username, email, password, type } = req.body;
    const isDeleted = false;

    // check for unique username and password
    // const oldUser = await User.find({ type: "user", username, email });
    // if (oldUser) {
    //   console.log('.... old user', { username, email });
    //   return res.status(406).json({ message: "username or email already in use" })
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
    console.log('.... user created', user);
    // Respond with the created user
    res.status(201).json({ user });
  } catch (error) {
    // Handle any errors that occur during user creation
    next(error);
  }
};

exports.verify = async (user) => {
  const data = User.find({ email: user.email, isDeleted: false });
  return data.password === user.password ? true : false;
};

exports.remove = async (req, res) => {
  const _id = req.params.id;
  return User.deleteOne({ _id });
};

exports.edit = async (req, res, next) => {
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

exports.confirm = async (req, res) => {
  try {
    const { password } = req.body;
    console.log("....confirm....confirm....confirm...");
    const match = await User.matchSuperPassword(password);
    console.log("....isConfirmed", match);
    return res.send(match);
  } catch (error) { }

  return res.send(false);
};

exports.changePassword = async (req, res) => {
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

exports.getProfile = async (req, res) => {
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

exports.editProfile = async (req, res) => {
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
