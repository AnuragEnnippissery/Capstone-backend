import Video from "../models/video.model.js";
import Channel from "../models/channel.model.js";

export async function InsertVideos(req,res){
    try {
    const { title, thumbnailUrl, videoUrl, description, channelId,uploader,views,likes,dislikes,category,comments } = req.body;

    const newVideo = new Video({
      title,
      thumbnailUrl,
      videoUrl,
      description,
      channelId,
      uploader,
      views,
      likes,
      dislikes,
      category,
      comments
    });

    await newVideo.save(); // insert into DB
    // Step 2: push video into channel’s videos array
    await Channel.findByIdAndUpdate(channelId, {
      $push: { videos: newVideo._id }})
    res.status(201).json({ message: "Video uploaded successfully!", video: newVideo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function GetVideos(req,res){
  try{
    let AllVideos= await Video.find().populate({
        path: "comments",          // populate comments in video
        populate: {
          path: "user",            // then populate user inside each comment
          select: "username email" // only return username & email
        }
      }).populate({
        path: "channelId",   // field in your Video schema that stores channel reference
        select: "channelName description " // only return what you need
      });
    
    res.send(AllVideos)
  }
  catch{
    res.status(500)
  }
}

export async function GetSingleVideo(req,res){
  try{
    let video =await Video.findById(req.params.id).populate({
        path: "comments",          // populate comments in video
        populate: {
          path: "user",            // then populate user inside each comment
          select: "username email" // only return username & email
        }
      }).populate({
        path: "channelId",   // field in your Video schema that stores channel reference
        select: "channelName description subscribers" // only return what you need
      });
    
    ;
    if(!video){
      res.status(400).json({"message":"video does not exist"})
    }
    res.send(video)

  }
  catch(err){
    console.error("Error in GetSingleVideo:", err);
    res.status(500).json({"message":" video id not found"})
  }
}