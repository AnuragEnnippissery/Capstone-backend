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

export async function UpdateVideo(req, res) {
  try {
    const VideoId = req.params.id;

    // Update and return the new video
    const updatedVideo = await Video.findByIdAndUpdate(
      VideoId,
      { $set: req.body },   // only update the fields passed in req.body
      { new: true }         // return the updated document instead of the old one
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video with this ID does not exist" });
    }

      // Populate username before sending response
      //const populatedComment = await CommentModel.findById(updatedComment._id)
      //.populate("user", "username"); // only get username from user
    return res.status(200).json({
      message: "Video updated successfully",
      updatedVideo,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

export async function DeleteVideo(req,res){
  try{

    const VideoId = req.params.id;
    const deletedVideo = await Video.findByIdAndDelete(VideoId)

    if(!deletedVideo){
      return res.status(404).json({message:"video with id do not exist"});
    }

    return res.status(200).json({message:"video deleted successfully", deletedVideo});
  }
  catch(error){
    return res.status(500).json({message:"error has occured in delete",error:error.message});
  }
}