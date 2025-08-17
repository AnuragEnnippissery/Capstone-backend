import mongoose, { Mongoose } from "mongoose";
import UserModel from "./user.model.js";

const commentSchema = new mongoose.Schema({
  
  user: { // Link comment to user schema
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel, //user Model
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

let CommentModel=mongoose.model("Comment",commentSchema);
export default CommentModel;