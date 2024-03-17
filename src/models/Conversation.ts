import { Document, Model, model, Schema } from 'mongoose';
import Message from './Message';
import { Interface } from 'readline';

interface ConvInterface extends Document {
  title: string;
  profile: string;
  type: string;
  // participants: [{ type: Schema.Types.ObjectId, ref: 'User' }];
  participants: any;  //   ::: SEE HERE :::
  created_at: Date;
  lastMessage: Date;
}

// Define the Conversation schema
const ConversationSchema: Schema<ConvInterface> = new Schema({
  title: { type: String, required: false },
  profile: { type: String, required: false },
  type: { type: String, enum: ["group", "conversation"] },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created_at: { type: Date, default: Date.now },
  lastMessage: {type: Date}
});

ConversationSchema.statics.findConversation = async function (type, id, userId) {
  console.log('....',);
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

ConversationSchema.statics.getMessages = async function (conversationId) {
  console.log('....conversationId', conversationId);
  const messages = await Message.find({ conversation_id: conversationId })
  console.log('....messages', messages);
  return messages;
}

interface ConvModel extends Model<ConvInterface> {
  findConversation(type: string, id: Schema.Types.ObjectId, userId: Schema.Types.ObjectId): Promise<any>;
  getMessages(conversationId: Schema.Types.ObjectId): Promise<any>;
}

const Conversation: ConvModel = model<ConvInterface, ConvModel>("Conversation", ConversationSchema);


export default Conversation