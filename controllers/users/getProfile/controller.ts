import User from "../../../models/User";



export default async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });
  console.log("....user", user);

  const profileData = {
    profilePic: user.profilePic,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  console.log("....profileData", profileData);
  
  res.status(201).send(profileData);
};

