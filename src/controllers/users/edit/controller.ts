import User from "../../../models/User";


export default async (req, res, next) => {
  // console.log(req.params);
  const userId = req.params.id;
  const { username, email, isDeleted } = req.body;

  try {
    // Find the user by ID and update their information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, isDeleted },
      { new: true } // This option returns the updated user data
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the updated user data
    res.status(200).json({ user: updatedUser });

  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};

