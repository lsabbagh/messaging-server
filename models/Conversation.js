const{ model, Schema } = require('mongoose');

// Define the Conversation schema
const ConversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  name: String,
  created_at: { type: Date, default: Date.now },
});
const Conversation = model("Conversation", ConversationSchema);
 module.exports = Conversation