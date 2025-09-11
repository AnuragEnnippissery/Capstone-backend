import ChannelModel from "../models/channel.model.js";
import Channel from "../models/channel.model.js"

export default async function InsertChannel(req,res){
    try{
        const{channelName,owner,description,channelBanner,subscribers,videos}=req.body;
        const newChannel=new ChannelModel({
            channelName,
            owner,
            description,
            channelBanner,
            subscribers,
            videos
        })
        await newChannel.save() // insert into db
        res.status(201).json({ message: "Channel created successfully", channel: newChannel });
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

export async function GetAllChannel(req, res) {
  try {
    let AllChannels = await Channel.find()
      .populate({
        path: "videos",
        select: "title thumbnailUrl views"
      })
      .populate({
        path: "owner",
        select: "username"
      });

    res.status(200).json(AllChannels);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function GetSingleChannel(req,res){
    try{
        let channel =await Channel.findById(req.params.id).populate({
        path: "videos",
        select: "title thumbnailUrl views"
      })
      .populate({
        path: "owner",
        select: "username"
      });
        if(!channel){
            res.status(404).json({message:"channel ID not found"})
        }
    // Check if the logged-in user is the owner
    if (channel.owner._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "You do not own this channel" });
    }
    res.status(200).json(channel);
    }
    catch{
        res.status(500).json({message:"single channel is failed"})
    }
}

// controller
export async function GetMyChannel(req, res) {
  try {
    //console.log("Decoded user in req:", req.user);
    const channel = await Channel.findOne({ owner: req.user.id })
      .populate({
        path: "videos",
        select: "title thumbnailUrl views"
      })
      .populate({
        path: "owner",
        select: "username"
      });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
