import Notes from "../../models/Notes.js";

const getAllGroupsWithCounts = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    // Aggregate to group by 'group' and count the number of notes in each group
    const groups = await Notes.aggregate([
      { $match: { author: userId } }, // Match notes by the current user
      {
        $group: {
          _id: "$group", // Group by the 'group' field (which is a string)
          itemsCount: { $sum: 1 }, // Count the number of notes in each group
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          name: "$_id", // Rename _id to 'name'
          itemsCount: 1, // Keep the count as 'itemsCount'
        },
      },
    ]);

    res.status(200).json(groups);
  } catch (err) {
    next(new CustomError(err.message));
  }
};

export default getAllGroupsWithCounts;
