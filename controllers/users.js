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

exports.userId = async (req, res) => {
    res.send(User.findOne(req.params.id));
}