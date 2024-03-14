import User from "../../../models/User";


export default async (req, res, next) => {
  const { isdeleted } = req.headers;

  const users = await User.find({ type: "admin", isDeleted: isdeleted });
  // console.log("....", users);
  
  res.send(users);
};



