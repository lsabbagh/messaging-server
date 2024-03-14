const bcrypt = require('bcrypt');
const saltRounds = 10;
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

exports.list = async (req, res, next) => {
  const { userId } = req.params
  let conversations = await Conversation.find({
    participants: { $in: [userId] }
  })
  const users = await User.find({});
  const usersById = {}
  users.forEach(user => {
    usersById[user._id] = user
  })
  console.log('....list done', conversations);
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
    const { userId } = req.params;
    const { type, id } = req.body;
    const body = req.body
    console.log('....create', { body, type, id, userId });
    if (type == undefined || type === 'conversation') {
      const participants = [userId, id].sort();
      // console.log('....pp', participants);
      let conversation = await Conversation.findConversation(type, id, userId);
      // if conversation does not exist create it and then find it
      if (!conversation) {
        console.log('....conversation created', typeof (conversation));
        const type = "conversation";
        await Conversation.create({ participants, type })
      }
      conversation = await Conversation.findConversation(type, id, userId);
      // get conversation's messages
      const messages = await Conversation.getMessages(conversation?._id)
      console.log('....conv', { conversation, messages });
      res.status(201).json({ conversation, messages });
    }
    else if (type === 'group') {
      let conversation = await Conversation.findConversation(type, id, userId);

      // get conversation's messages if the group is found
      if (conversation) {
        const messages = await Conversation.getMessages(conversation?._id)
        console.log('....grp', { conversation, messages });
        return res.status(201).json({ conversation, messages });
      }
    }
  } catch (error) {
    console.log('....error', error);
    // Handle any errors that occur during conversation creation
    next(error);
  }
}

exports.remove = async (req, res) => {
  const { conversationId } = req.params;
  const { type } = req.body;
  console.log('....id to be deleted', type, conversationId);
  await Conversation.deleteOne({ _id: conversationId });
  if (type == "group") {
    console.log('....message to be deleted', type);
    await Message.deleteMany({ conversation_id: conversationId });
    console.log('....message deleted',);
  }
  return res.send({ success: true })
}

// exports.listAllGroups = async (req, res) => {
//   const groups = await Conversation.find({ type: "group" }).populate('participants');
//   const groupsWithParticipantNames = await Promise.all(groups.map(async (group) => {
//     const populatedParticipants = await User.populate(group.participants, { path: 'participants', select: 'username' });
//     const participantNames = populatedParticipants.map(user => user.username).join(', ')
//     return { ...group.toObject(), participants: participantNames };
//   }));
//   return res.send(groupsWithParticipantNames);
// }
exports.listAllGroups = async (req, res) => {
  try {
    const groups = await Conversation.find({ type: "group" }).populate('participants');
    const groupsWithParticipantDetails = await Promise.all(groups.map(async (group) => {
      const populatedParticipants = await User.find({ _id: { $in: group.participants } }, 'username');
      const participants = populatedParticipants.map(user => ({ id: user._id, username: user.username }));
      return { ...group.toObject(), participants };
    }));
    return res.send(groupsWithParticipantDetails);
  } catch (error) {
    console.error('Error fetching groups with participants:', error);
    return res.status(500).send('Internal Server Error');
  }
}

exports.createGroup = async (req, res) => {
  const { title, participants } = req.body;
  console.log('....createGroup', title, participants);
  const type = 'group';
  const profile = 'https://i.imgur.com/g9vUamj.jpg'   //Default group profile

  //try and find the group first
  let group = await Conversation.findOne({ title, type });

  if (!group || group == undefined) {
    console.log('....creating group', participants);
    await Conversation.create({ title, type, participants, profile });
    group = await Conversation.findOne({ title, type });
  }

  const messages = await Conversation.getMessages(group?._id)
  console.log('....group created', { group, messages });

  res.status(201).json({ group, messages });
}

exports.editGroup = async (req, res) => {
  const { groupId } = req.params;
  const { title, participants, profile } = req.body;
  console.log('....editGroup', { title, participants, profile });
  // const participantIds = participants.map(participant => participant._id);
  try {
    const updatedGroup = await Conversation.findByIdAndUpdate(
      groupId,
      { title, participants, profile },
      { new: true }
    )
    console.log('....updatedGroup', updatedGroup);
    if (!updatedGroup) {
      console.log('....updatedGroup..!!!', updatedGroup);
      return res.status(404).json({ error: "Group not found" });
    }

    // Respond with the updated user data
    res.status(200).send({ group: updatedGroup });
  } catch (error) {
    console.log(error);
    res.send({ success: false });
  }
}
