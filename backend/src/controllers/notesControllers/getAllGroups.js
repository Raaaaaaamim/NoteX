import Notes from "../../models/Notes.js";

const getAllGroups = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const groups = await Notes.distinct("group", { author: userId });

    res.status(200).json(groups);
  } catch (err) {
    next(new CustomError(err.message));
  }
};
export default getAllGroups;
