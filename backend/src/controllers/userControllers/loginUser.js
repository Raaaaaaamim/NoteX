import User from "../../models/User.js";
import { createTokenAndSendCookie, CustomError } from "../../utils/helper.js";

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new CustomError("All fields are required", 404));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    if (user.password !== password) {
      return next(new CustomError("Password is incorrect", 404));
    }
    createTokenAndSendCookie(user.id, res);
    user.password = null;
    res.status(200).json(user);
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default loginUser;
