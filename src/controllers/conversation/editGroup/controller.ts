import Conversation from "../../../models/Conversation";


export default async (req, res) => {
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
    res.status(500).send({ success: false });
  }
}

