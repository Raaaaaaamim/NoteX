import Notes from "../../models/Notes.js";
import { CustomError } from "../../utils/helper.js";
const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const { title, content, group } = req.body;
    const note = await Notes.findById(id);
    if (!note) {
      return next(new CustomError("Note not found", 404));
    }
    const isAuthor = note.author.toString() === userId.toString();
    if (!isAuthor) {
      return next(new CustomError("Not authorized", 401));
    }
    const updatedNote = await Notes.findByIdAndUpdate(
      id,
      { title, content, group },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default updateNote;
