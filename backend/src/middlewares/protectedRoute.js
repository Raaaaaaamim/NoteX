import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { CustomError } from "../utils/helper.js";
const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(req.cookies);
    if (!token) {
      return next(new CustomError("Invalid user token", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new CustomError("Login first", 404));
    }

    req.user = user;
    next();
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default protectedRoute;
