import User from "../../models/User.js";
import { CustomError } from "../../utils/helper.js";
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    user.password = null;
    res.status(200).json(user);
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default getUser;
