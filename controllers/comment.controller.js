import CommentModel from "../models/comment.model.js";
import Video from "../models/video.model.js";

export async function InsertComment(req,res){
    try{
        const {user,videoId,text}=req.body;
        const newComment=new CommentModel({
            user,
            videoId,
            text
        })
        await newComment.save() // insert into db
        await Video.findByIdAndUpdate(videoId, {
        $push: { comments: newComment._id }})
        res.status(201).json({ message: "Comment uploaded successfully!", comment: newComment });

    }
    catch (err) {
    res.status(500).json({ error: err.message });
  }
}