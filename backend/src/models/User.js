import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: [true, "Id is needed"],
    },
    email: {
      type: String,
      required: [true, "Email is required "],
    },
    fullName: {
      type: String,
      required: [true, "Full Name is required "],
    },
    password: {
      type: String,
      required: [true, "Password is required "],
    },
    pfp: {
      type: String,
    },
    notes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Note",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
