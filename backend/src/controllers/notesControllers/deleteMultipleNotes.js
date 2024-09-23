import Notes from "../../models/Notes.js";
import { CustomError } from "../../utils/helper.js";
const deleteMultipleNotes = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { notes } = req.body;
    Array.isArray(notes) || next(new CustomError("Notes not found", 404));
    if (!notes || notes.length === 0) {
      return next(new CustomError("Notes not found", 404));
    }
    notes.forEach(async (note) => {
      const noteExists = await Notes.findById(note);
      if (!noteExists) {
        return next(new CustomError("Note not found", 404));
      }
      const isAuthor = noteExists.author.toString() === userId.toString();
      if (!isAuthor) {
        return next(new CustomError("Not authorized", 401));
      }
      await Notes.findByIdAndDelete(note);
    });

    res.status(200).json({
      success: true,
      message: "Notes deleted successfully",
    });
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default deleteMultipleNotes;
