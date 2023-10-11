const { model, Schema } = require('mongoose');
const Message = require('../models/Message');

// Define the Conversation schema
const ConversationSchema = new Schema({
  title: { type: String, required: false },
  type: { type: String, enum: ["group", "conversation"] },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created_at: { type: Date, default: Date.now },
});
const Conversation = model("Conversation", ConversationSchema);

Conversation.findConversation = async function (type, id, userId) {
  console.log('....', );
  if (type === "conversation") {
    const conv = await Conversation.findOne({
      $and: [
        { participants: { $in: [userId] } },
        { participants: { $in: [id] } },
        { type: "conversation" },
      ]
      // type: "conversation",
      // participants: { $all: [userId, id] }
    });
    return conv
  } else if (type === "group") {
    const conv = await Conversation.findOne({ _id: id });
    return conv
  }
}

Conversation.getMessages = async function (conversationId) {
  console.log('....conversationId', conversationId);
  const messages = await Message.find({ conversation_id: conversationId })
  console.log('....messages', messages);
  return messages;
}

module.exports = Conversation