import { Document, Model, Schema, model } from "mongoose";

interface MessageInterface extends Document {
  conversation_id: Schema.Types.ObjectId;
  user: Object;
  text: string;
  createdAt: Date;
}


const MessageSchema: Schema<MessageInterface> = new Schema({
  conversation_id: { type: Schema.Types.ObjectId, ref: "Conversation" },
  user: { type: Object },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message: Model<MessageInterface> = model("Message", MessageSchema);

export default Message;
