import Conversation from "../../../models/Conversation";



export default async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { type, id } = req.body;
    console.log("....create", { type, id, userId });

    if (type == undefined || type === "conversation") {
      const participants = [userId, id].sort();
      // console.log('....pp', participants);
      let conversation = await Conversation.findConversation(type, id, userId);

      // if conversation does not exist create it and then find it
      if (!conversation) {
        console.log("....conversation created", typeof conversation);
        const type = "conversation";
        await Conversation.create({ participants, type });
      }

      conversation = await Conversation.findConversation(type, id, userId);

      // get conversation's messages
      const messages = await Conversation.getMessages(conversation?._id);
      console.log("....conv", { conversation, messages });
      res.status(201).json({ conversation, messages });
    } else if (type === "group") {
      let conversation = await Conversation.findConversation(type, id, userId);

      // get conversation's messages if the group is found
      if (conversation) {
        const messages = await Conversation.getMessages(conversation?._id);
        console.log("....grp", { conversation, messages });
        return res.status(201).json({ conversation, messages });
      }
    }
  } catch (error) {
    console.log("....error", error);

    // Handle any errors that occur during conversation creation
    return res.status(500).send('Internal Server Error');
  }
};

