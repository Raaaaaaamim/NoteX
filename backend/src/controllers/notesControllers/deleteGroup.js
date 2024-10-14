import Notes from "../../models/Notes.js";
import { CustomError } from "../../utils/helper.js";

/**
 * @description Delete a group of notes
 * @param {string} group - The name of the group to delete
 * @param {object} req.user - The user object from the request
 * @returns {object} - A JSON response with a success message
 */
const deleteGroup = async (req, res, next) => {
  try {
    // Get the group name from the URL parameter
    const { group } = req.params;

    // Get the user ID from the request
    const { _id: userId } = req.user;

    // Check if the group exists and belongs to the user
    const groupExists = await Notes.findOne({ group, author: userId });
    if (!groupExists) {
      // If the group does not exist, return a 404 error
      return next(new CustomError("Group not found", 404));
    }

    // Delete all notes in the group
    await Notes.deleteMany({ group, author: userId });

    // Return a success message
    res.status(200).json({
      success: true,
      message: "Group deleted successfully",
    });
  } catch (err) {
    // If an error occurs, pass it to the next middleware
    next(new CustomError(err.message));
  }
};

export default deleteGroup;
