const { model, Schema } = require('mongoose')

// Define the Conversation schema
const AuthenticationSchema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  authType: { type: String, enum: ["cms", "mbl"] },
  created_at: { type: Date, default: Date.now },
});

const Auth = model("Auth", AuthenticationSchema);



module.exports = Auth