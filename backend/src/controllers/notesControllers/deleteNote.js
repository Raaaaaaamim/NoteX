import Notes from "../../models/Notes.js";
import { CustomError } from "../../utils/helper.js";
const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { _id: userId } = req.user;
    const note = await Notes.findById(id);
    const isAuthor = note.author.toString() === userId.toString();
    if (!isAuthor) {
      return next(new CustomError("Not authorized", 401));
    }
    await Notes.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default deleteNote;
