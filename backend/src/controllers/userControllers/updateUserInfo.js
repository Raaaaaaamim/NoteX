import { CustomError } from "../../utils/helper.js";
const updateUserInfo = async (req, res, next) => {
  try {
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default updateUserInfo;
