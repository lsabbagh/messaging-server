const Message = require('../models/Message');
const Conversation = require('../models/Conversation');


exports.append = async (req, res) => {
  const { messages } = req.body
  const { conversationId } = req.params
  await Message.insertMany(messages.map(message => ({
    text: message.text,
    user: message.user,
    conversation_id: conversationId,
    createdAt: message.createdAt,
  })))
  const lastMessage = Date.now();
  console.log('....lastMessage', lastMessage);
  await Conversation.findByIdAndUpdate(
    conversationId,
    { lastMessage },
    { new: true }
  )
  res.send({ success: true })
}