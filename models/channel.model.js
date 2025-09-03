import mongoose, { Mongoose } from "mongoose";
//import UserModel from "./user.model.js";

const channelSchema = new mongoose.Schema({
  
  channelName: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // links to the User model
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  channelBanner: {
    type: String,
    required: true,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video", // links to Video model
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

let ChannelModel=mongoose.model("Channel",channelSchema);
export default ChannelModel;