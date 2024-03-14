import User from "../../../models/User";


export default async (req, res, next) => {
  const users = await User.find({ isDeleted: false });
  console.log("....controller..users..list", users);
  
  res.send(users);
};

