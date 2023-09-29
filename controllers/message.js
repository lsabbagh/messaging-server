const Message = require('../models/Message'); 



exports.append = async (req, res) => {
  const {messages} = req.body
  const {conversationId} = req.params
  await Message.insertMany(messages.map(message => ({
    text: message.text,
    user: message.user,
    conversation_id: conversationId,
    createdAt: message.createdAt,
  })))
  res.send({success: true})
}