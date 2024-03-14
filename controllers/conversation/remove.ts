import Conversation from "../../models/Conversation";
import Message from "../../models/Message";
import Ajv from "ajv";
const ajv = new Ajv();

export const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        type: {type: "string", enum: ["group"]}
      },
      required: ["type"],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};

export const controller = async (req, res) => {
  const { conversationId } = req.params;
  const { type } = req.body;
  console.log("....id to be deleted", type, conversationId);
  await Conversation.deleteOne({ _id: conversationId });
  if (type == "group") {
    console.log("....message to be deleted", type);
    await Message.deleteMany({ conversation_id: conversationId });
    console.log("....message deleted");
  }
  return res.send({ success: true });
};

