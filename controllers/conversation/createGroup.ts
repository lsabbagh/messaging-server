import Conversation from "../../models/Conversation";
import Ajv from "ajv";
const ajv = new Ajv();

export const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        title: {type: 'string'},
        participants: {type: "string"}
      },
      required: ["title", "participants"],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};

export const controller = async (req, res) => {
  const { title, participants } = req.body;
  const type = "group";
  const profile = "https://i.imgur.com/g9vUamj.jpg"; //Default group profile
  console.log("....createGroup", title, participants);


  //try and find the group first
  let group = await Conversation.findOne({ title, type });

  if (!group || group == undefined) {
    console.log("....creating group", participants);
    await Conversation.create({ title, type, participants, profile });
    group = await Conversation.findOne({ title, type });
  }

  
  const messages = await Conversation.getMessages(group?._id);
  console.log("....group created", { group, messages });

  res.status(201).json({ group, messages });
};

