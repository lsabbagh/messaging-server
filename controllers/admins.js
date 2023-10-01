const bcrypt = require('bcrypt');
const saltRounds = 10;
const Admin = require('../models/Admin'); 

exports.list= async(req,res,next)=>{

    const admins = await Admin.find({})
    
    res.send(admins)
};

exports.create = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      //encrypt password
      const hashedPassword = await bcrypt.hash(password, saltRounds)
  
      // Create a new admin with the provided data
      const admin = await Admin.create({
        username,
        email,
        password: hashedPassword,
      });
  
      // Respond with the created admin
      res.status(201).json({ admin });
    } catch (error) {
      // Handle any errors that occur during admin creation
      next(error);
    }
};

exports.verify = async(admin) => {
    const data = Admin.find({ email: admin.email });
    return data.password === admin.password ? true : false;
}

exports.remove = async (req, res) => {
  const _id = req.params.id
  return Admin.deleteOne({_id})
}

exports.signIn = async (req, res) => {
  const { username, email, password } = req.body;
  const admin = await Admin.findOne({username})
  if(!admin) {
    return res.status(404).send('Admin not found');
  }

  const match = await admin.matchPassword(password)
  if(!match) {
    return res.status(401).send('Incorrect password');
  }

  const _admin = {...admin.toJSON()}
  delete _admin.password
  return res.send({match, admin: _admin})
}

exports.edit = async (req, res, next) => {
  console.log(req.params);
  const userId = req.params.id; 
  const { username, email, password } = req.body; 

  try {
    // Find the admin by ID and update their information
    const updatedAdmin = await Admin.findByIdAndUpdate(
      userId,
      { username, email, password }, 
      { new: true } // This option returns the updated admin data
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Respond with the updated admin data
    res.status(200).json({ admin: updatedAdmin });
  } catch (error) {
    console.log(error);
    res.send({success: false});
  }
};
