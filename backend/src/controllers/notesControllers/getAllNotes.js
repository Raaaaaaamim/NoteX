import Notes from "../../models/Notes.js";
import { CustomError } from "../../utils/helper.js";
const getAllNotes = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const notes = await Notes.find({ author: userId });
    console.log("here 3");

    res.status(200).json(notes);
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default getAllNotes;
