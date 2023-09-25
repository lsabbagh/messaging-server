const{ model, Schema } = require('mongoose');

const MessageSchema = new mongoose.Schema({
  conversation_id: { type: Schema.Types.ObjectId, ref: 'Conversation' },
  sender_id: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  type: String,
  timestamp: { type: Date, default: Date.now },
});
const Message = model("Message", MessageSchema);
 module.exports = Message