import Conversation from "../../models/Conversation";
import User from "../../models/User";
import Ajv from "ajv";
const ajv = new Ajv();

export const schema = {
  type: "object",
  properties: {
    // params: {}
  },
  required: [],
  additionalProperties: true,
};

export const controller = async (req, res, next) => {
  const { userId } = req.params;

  let conversations = await Conversation.find({
    participants: { $in: [userId] },
  });
  const users = await User.find({});
  const usersById = {};

  users.forEach((user) => {
    usersById[user._id] = user;
  });
  console.log("....list done", conversations);

  const _conversations = conversations.map((conversation) => {
    const otherParticipantId = conversation.participants.sort((item) =>
      item != userId ? -1 : 1
    )?.[0];
    return {
      ...conversation.toJSON(),
      otherParticipant: usersById[otherParticipantId],
    };
  });
  
  res.send(_conversations);
};

