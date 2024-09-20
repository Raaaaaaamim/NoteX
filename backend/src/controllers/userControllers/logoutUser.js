import { CustomError } from "../../utils/helper.js";

const logoutUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(new CustomError("Login first", 404));
    }

    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default logoutUser;
