const Conversation = require("../../models/Conversation");
const User = require("../../models/User");
const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    // params: {}
  },
  required: [],
  additionalProperties: true,
};

const controller = async (req, res, next) => {
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

  conversations = conversations.map((conversation) => {
    const otherParticipantId = conversation.participants.sort((item) =>
      item != userId ? -1 : 1
    )?.[0];
    return {
      ...conversation.toJSON(),
      otherParticipant: usersById[otherParticipantId],
    };
  });
  
  res.send(conversations);
};

module.exports = { controller, schema };
