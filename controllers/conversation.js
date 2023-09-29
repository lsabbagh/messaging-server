const bcrypt = require('bcrypt');
const saltRounds = 10;
const Conversation = require('../models/Conversation'); 
const Message = require('../models/Message'); 

exports.list= async(req,res,next)=>{
    const conversations = await Conversation.find({})
    
    res.send({conversations})
};

exports.create = async (req, res, next) => {
    try {

      const {userId, participantId} = req.body
      const participants = [userId, participantId]
      const id = participants.join('-')
      // Create a new conversation with the provided data
      const conversation = await Conversation.findOneAndUpdate(
        {id},
        { id, participants });
  
        console.log('....', conversation)
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