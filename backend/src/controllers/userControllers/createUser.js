import User from "../../models/User.js";
import { CustomError, createTokenAndSendCookie } from "../../utils/helper.js";
const createUser = async (req, res, next) => {
  try {
    const { email, password, fullName, _id, pfp } = req.body;

    if (!email || !password || !fullName || !_id) {
      return next(new CustomError("all fields are required", 400));
    }
    const isAUser = await User.findOne({ email });
    console.log(isAUser);
    if (isAUser) {
      return next(new CustomError("User already exists", 400));
    }
    const newUser = await User.create({
      email,
      password,
      fullName,
      pfp,
      _id,
    });
    newUser.password = null;
    createTokenAndSendCookie(_id, res);
    res.status(200).json(newUser);
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default createUser;
