const bcrypt = require('bcrypt');
const saltRounds = 10;
const Conversation = require('../models/Conversation'); 

exports.list= async(req,res,next)=>{

    const conversations = await Conversation.find({})
    console.log('....', conversations)
    
    res.send({conversations})
};

exports.create = async (req, res, next) => {
    try {

      const {participants} = req.body
      // Create a new conversation with the provided data
      const conversation = await Conversation.create({
        participants,
      });
  
      // Respond with the created conversation
      res.status(201).json({ conversation });
    } catch (error) {
      // Handle any errors that occur during conversation creation
      next(error);
    }
};

exports.remove = async (req, res) => {
  const _id = req.params.id
  return Conversation.deleteOne({_id})
}