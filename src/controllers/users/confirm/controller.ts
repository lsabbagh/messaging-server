import User from "../../../models/User"



export default async (req, res) => {
  try {
    const { password } = req.body;
    console.log("....confirm....confirm....confirm...");

    const match = await User.matchSuperPassword(password);
    console.log("....isConfirmed", match);

    return res.send(match);

  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false })
  }

};
