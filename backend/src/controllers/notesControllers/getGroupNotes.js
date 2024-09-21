import Notes from "../../models/Notes.js";
import { CustomError } from "../../utils/helper.js";

const getAllGroups = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { group } = req.params;
    if (!group) {
      return next(new CustomError("Group not found", 404));
    }
    const notes = await Notes.find({ author: userId, group });
    if (!notes) {
      return next(new CustomError("Group not found", 404));
    }

    res.status(200).json(notes);
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default getAllGroups;
