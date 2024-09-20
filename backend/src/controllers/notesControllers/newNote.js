import Note from "../../models/Notes.js";
import { CustomError } from "../../utils/helper.js";
const newNote = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const { title, content, group } = req.body;
    if (!title || !content) {
      return next(new CustomError("All fields are required", 404));
    }

    const newNote = await Note.create({
      title,
      content,
      author: _id,
      group: group || "",
    });
    res.status(200).json(newNote);
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default newNote;
