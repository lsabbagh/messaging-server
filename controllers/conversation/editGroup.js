const Conversation = require("../../models/Conversation");
const Ajv = require("ajv")
const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    // params: {},
    body: {
      type: "object",
      properties: {
        title: {type: "string"},
        participants: {type: "string"},
        profile: {type: "string"}
      },
      required: ["title", "participants", "profile"],
      additionalProperties: false
    }
  },
  required: [],
  additionalProperties: true
}
    



const controller = async (req, res) => {
  const { groupId } = req.params;
  const { title, participants, profile } = req.body;
  console.log('....editGroup', { title, participants, profile });

  try {
    const updatedGroup = await Conversation.findByIdAndUpdate(
      groupId,
      { title, participants, profile },
      { new: true }
    )
    console.log('....updatedGroup', updatedGroup);

    if (!updatedGroup) {
      console.log('....updatedGroup..!!!', updatedGroup);
      return res.status(404).json({ error: "Group not found" });
    }

    // Respond with the updated user data
    res.status(200).send({ group: updatedGroup });

  } catch (error) {
    console.log(error);
    res.send({ success: false });
  }
}

module.exports = {controller, schema}
