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
    type: String,
    required: true
  },
  uploader: { // Link uploader to User schema
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
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
  comments: [{type: mongoose.Schema.Types.ObjectId,
    ref: CommentModel}]
});

// Create the model
const Video = mongoose.model("Video", videoSchema);

export default Video;
