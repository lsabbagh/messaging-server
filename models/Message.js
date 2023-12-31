const{ model, Schema } = require('mongoose');

const MessageSchema = new Schema({
  conversation_id: { type: Schema.Types.ObjectId, ref: 'Conversation' },
  user: { type: Object },
  text: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});
const Message = model("Message", MessageSchema);
 module.exports = Message