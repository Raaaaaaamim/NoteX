import Notes from "../../models/Notes.js";
import { CustomError } from "../../utils/helper.js";
const newNote = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const { title, content, group } = req.body;
    if (!title || !content) {
      return next(new CustomError("All fields are required", 422));
    }

    if (group.length > 15) {
      return next(new CustomError("Group name is too long", 422));
    }
    if (group.trim().includes(" ")) {
      return next(new CustomError("Group names can't have spaces", 422));
    }

    if (title.length > 40) {
      return next(new CustomError(" Title is too long", 422));
    }
    if (title.length > 500) {
      return next(new CustomError(" Content is too long", 422));
    }
    const newNote = await Notes.create({
      title,
      content,
      author: _id,
      group: group || "Empty",
    });
    res.status(200).json(newNote);
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default newNote;
