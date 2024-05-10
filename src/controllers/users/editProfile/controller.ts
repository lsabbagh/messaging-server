import User from "../../../models/User";


export default async (req, res) => {
  const { id } = req.params;
  let { profilePic, firstName, lastName } = req.body;

  if (!profilePic || profilePic == undefined || profilePic == null) {
    return (profilePic = "https://imgur.com/a/X3TMJ7a");
  }

  try {
    const updatedData = await User.findByIdAndUpdate(
      id,
      { profilePic, firstName, lastName },
      { new: true } // This option returns the updated user data
    );

    if (!updatedData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ updatedData: updatedData });

  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};

