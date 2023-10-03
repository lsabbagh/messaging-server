const bcrypt = require('bcrypt');
const saltRounds = 10;
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

exports.list = async (req, res, next) => {
  const { userId } = req.params
  console.log('.123', userId);
  let conversations = await Conversation.find({
    participants: { $in: [userId] }
  })
  const users = await User.find({})
  const usersById = {}
  users.forEach(user => {
    usersById[user._id] = user
  })
  conversations = conversations.map(conversation => {
    const otherParticipantId = conversation.participants
      .sort(item => item != userId ? -1 : 1)?.[0]
    return {
      ...conversation.toJSON(),
      name: usersById[otherParticipantId]?.username
    }
  })
  res.send(conversations)
};

exports.create = async (req, res, next) => {
  try {

    const { userId, participantId } = req.params
    const { conversationName } = req.body
    const participants = [userId, participantId].sort();
    // const id = participants.join('-')
    const name = conversationName;
    console.log('name', name);
    // Create a new conversation with the provided data
    let conversation = await Conversation.findOne({
      $and: [
        { participants: { $in: [userId] } },
        { participants: { $in: [participantId] } },
      ]
    });
    console.log('...con', conversation);
    if (!conversation) {
      await Conversation.create({ participants, name })
    }
    conversation = await Conversation.findOne({
      $and: [
        { participants: { $in: [userId] } },
        { participants: { $in: [participantId] } },
      ]
    });
    console.log('...con2', conversation);
    conversation = await Conversation
      .findOneAndUpdate({ _id: conversation?._id }, { participants });
    const messages = await Message.find({ conversation_id: conversation?._id })
    res.status(201).json({ conversation, messages });
  } catch (error) {
    // Handle any errors that occur during conversation creation
    next(error);
  }
};

exports.remove = async (req, res) => {
  const _id = req.params.id
  return Conversation.deleteOne({ _id })
}