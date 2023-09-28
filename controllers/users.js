const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User'); 

exports.list= async(req,res,next)=>{

    const users = await User.find({})
    
    res.send(users)
};

exports.create = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      //encrypt password
      const hashedPassword = await bcrypt.hash(password, saltRounds)
  
      // Create a new user with the provided data
      const user = await User.create({
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

exports.verify = async(user) => {
    const data = User.find({ email: user.email });
    return data.password === user.password ? true : false;
}

exports.remove = async (req, res) => {
  const _id = req.params.id
  return User.deleteOne({_id})
}

exports.signIn = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({username})
  if(!user) {
    return res.send('User not found')
  }
  const match = await user.matchPassword(password)

  const _user = {...user.toJSON()}
  delete _user.password
  return res.send({match, user: _user})
}

exports.edit = async (req, res, next) => {
  const userId = req.params.id; 
  const { username, email, password } = req.body; 

  try {
    // Find the user by ID and update their information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password }, // Specify the fields to update
      { new: true } // This option returns the updated user data
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the updated user data
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};
