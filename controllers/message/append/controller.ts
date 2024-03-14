import Message from "../../../models/Message";
import Conversation from "../../../models/Conversation";


export default async (req, res) => {
  const { messages } = req.body;
  const { conversationId } = req.params;

  await Message.insertMany(
    messages.map((message) => ({
      text: message.text,
      user: message.user,
      conversation_id: conversationId,
      createdAt: message.createdAt,
    }))
  );

  const lastMessage = Date.now();
  console.log("....lastMessage", lastMessage);

  await Conversation.findByIdAndUpdate(
    conversationId,
    { lastMessage },
    { new: true }
  );
  
  res.send({ success: true });
};

