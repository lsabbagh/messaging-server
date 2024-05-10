import User from "../../../models/User";

export default async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  const profileData = {
    profilePic: user.profilePic,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  res.status(201).send(profileData);
};

