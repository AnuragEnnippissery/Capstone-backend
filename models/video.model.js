import mongoose from "mongoose";
import UserModel from "./user.model.js";
import CommentModel from "./comment.model.js";

const videoSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
    trim: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true
  },
  uploader: { // Link uploader to User schema
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    trim: true
  },
  comments: [{type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"}]
});

// Create the model
const Video = mongoose.model("Video", videoSchema);

export default Video;
