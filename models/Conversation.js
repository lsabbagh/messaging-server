const{ model, Schema } = require('mongoose');
const Message = require('../models/Message');

// Define the Conversation schema
const ConversationSchema = new Schema({
  title: {type: String, required: false},
  type: {type: String, enum:["group" , null]},
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created_at: { type: Date, default: Date.now },
});
const Conversation = model("Conversation", ConversationSchema);

Conversation.findConversation = async function (userId, participantId) {
  const conv = await Conversation.findOne({
    $and: [
      { participants: { $in: [userId] } },
      { participants: { $in: [participantId] } },
      { type: null },
    ]
  });
  return conv;
}

Conversation.getMessages = async function (conversationId) {
  const messages = await Message.find({ conversation_id: conversationId })
  return messages;
}

 module.exports = Conversation