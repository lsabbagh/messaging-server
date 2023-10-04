const bcrypt = require('bcrypt');
const saltRounds = 10;
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

exports.list = async (req, res, next) => {
  const { userId } = req.params
  // console.log('.123', userId);
  let conversations = await Conversation.find({
    participants: { $in: [userId] }
  })
  const users = await User.find({})
  const usersById = {}
  users.forEach(user => {
    usersById[user._id] = user
  })
  console.log('....list done', );
  conversations = conversations.map(conversation => {
    const otherParticipantId = conversation.participants
      .sort(item => item != userId ? -1 : 1)?.[0]
    return {
      ...conversation.toJSON(),
      otherParticipant: usersById[otherParticipantId]
    }
  })
  res.send(conversations)
};

exports.create = async (req, res, next) => {
  try {
    console.log('....first', req.params);
    const { userId, participantId } = req.params
    const {title, type} = req.body
    const participants = [userId, participantId].sort();
    console.log('....pp', participants);
    let conversation = await Conversation.findConversation(userId, participantId);
    // console.log('...con', conversation);
    if (!conversation) {
      console.log('....', 'conversation created');
      await Conversation.create({ participants })
    }
    conversation = await Conversation.findConversation(userId, participantId);
    // console.log('...con2', conversation);
    // conversation = await Conversation
    //   .findOneAndUpdate({ _id: conversation?._id }, { participants });
    const messages = await Message.find({ conversation_id: conversation?._id })
    console.log('....ff', { conversation, messages });
    res.status(201).json({ conversation, messages });
  } catch (error) {
    console.log('....error', error);
    // Handle any errors that occur during conversation creation
    next(error);
  }
};

exports.remove = async (req, res) => {
  const _id = req.params.id
  return Conversation.deleteOne({ _id })
}

exports.listGroups = async (req, res) => {
  return res.send('..');
}

exports.listAllGroups = async (req, res) => {
  const groups = await Conversation.find({type: "group"});
  return res.send(groups);
}
exports.createGroup = async (req, res) => {
  const {title, type, participants} = req.body;
  const group = await Conversation.create({title, type, participants});
  return res.send(group);
}

exports.editGroup = async (req, res) => {
  return res.send('..')
}

exports.deleteGroup = async (req, res) => {
  const _id = req.params.id
  return Conversation.deleteOne({ _id })
}