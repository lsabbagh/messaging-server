const Message = require("../../models/Message");
const Conversation = require("../../models/Conversation");
const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        messages: {type: "array"}
      },
      required: ['messages'],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};

const controller = async (req, res) => {
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

module.exports = { controller, schema };
