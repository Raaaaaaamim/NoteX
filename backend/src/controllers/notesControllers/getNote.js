import Notes from "../../models/Notes.js";
import { CustomError } from "../../utils/helper.js";

const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const note = await Notes.findById(id);
    if (!note) {
      return next(new CustomError("Note not found", 404));
    }
    const isAuthor = note.author.toString() === userId.toString();
    if (!isAuthor) {
      return next(new CustomError("Not authorized", 401));
    }
    res.status(200).json(note);
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default getNote;
