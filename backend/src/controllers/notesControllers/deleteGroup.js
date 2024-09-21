import Notes from "../../models/Notes.js";
import { CustomError } from "../../utils/helper.js";
const deleteGroup = async (req, res, next) => {
  try {
    const { group } = req.params;
    const { _id: userId } = req.user;
    const groupExists = await Notes.findOne({ group, author: userId });
    if (!groupExists) {
      return next(new CustomError("Group not found", 404));
    }

    await Notes.deleteMany({ group, author: userId });
    res.status(200).json({
      success: true,
      message: "Group deleted successfully",
    });
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default deleteGroup;
