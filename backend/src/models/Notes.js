import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required "],
    },
    content: {
      type: String,
      required: [true, "Content is required "],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    author: {
      type: String,
      ref: "User",
    },
    group: {
      type: String,
      default: "Empty",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", noteSchema);
