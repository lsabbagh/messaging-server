import Conversation from "../../models/Conversation";
import User from "../../models/User";
import Ajv from "ajv";
const ajv = new Ajv()

export const schema = {
  type: "object",
  properties: {

  },
  required: [],
  additionalProperties: true
}
    



export const controller = async (req, res) => {
  try {
    const groups = await Conversation.find({ type: "group" }).populate('participants');

    const groupsWithParticipantDetails = await Promise.all(groups.map(async (group) => {

      const populatedParticipants = await User.find({ _id: { $in: group.participants } }, 'username');
      const participants = populatedParticipants.map(user => ({ id: user._id, username: user.username }));
      return { ...group.toObject(), participants };
    }));

    return res.send(groupsWithParticipantDetails);
    
  } catch (error) {
    console.error('Error fetching groups with participants:', error);
    return res.status(500).send('Internal Server Error');
  }
}

