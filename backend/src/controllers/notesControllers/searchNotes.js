import Notes from "../../models/Notes.js";
import { CustomError, getHighlightedText } from "../../utils/helper.js";

const searchNotes = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { query } = req.params;

    const notes = await Notes.find({
      $or: [
        {
          title: { $regex: query, $options: "i" },
        },
        {
          content: { $regex: query, $options: "i" },
        },
      ],
      author: userId,
    }).select("_id title content"); // Only fetch _id, title, and content

    if (!notes || notes.length === 0) {
      return res.status(200).json(null);
    }

    const results = notes.map((note) => {
      const titleMatch = getHighlightedText(note.title, query);
      const contentMatch = getHighlightedText(note.content, query);

      return {
        _id: note._id, // Only return _id
        matches: {
          title: titleMatch,
          content: contentMatch,
        },
      };
    });

    res.status(200).json(results);
  } catch (err) {
    next(new CustomError(err.message));
  }
};

export default searchNotes;
