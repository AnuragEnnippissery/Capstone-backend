import Video from "../models/video.model.js";

export async function InsertVideos(req,res){
    try {
    const { title, thumbnailUrl, videoUrl, description, channelId,uploader,views,likes,dislikes } = req.body;

    const newVideo = new Video({
      title,
      thumbnailUrl,
      videoUrl,
      description,
      channelId
    });

    await newVideo.save(); // insert into DB

    res.status(201).json({ message: "Video uploaded successfully!", video: newVideo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}