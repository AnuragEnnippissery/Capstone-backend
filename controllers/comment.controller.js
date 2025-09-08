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

        // Populate username before sending response
      const populatedComment = await CommentModel.findById(newComment._id)
      .populate("user", "username"); // only get username from user
        res.status(201).json({ message: "Comment uploaded successfully!", comment: populatedComment });

    }
    catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function UpdateComment(req, res) {
  try {
    const commentId = req.params.id;

    // Update and return the new comment
    const updatedComment = await CommentModel.findByIdAndUpdate(
      commentId,
      { $set: req.body },   // only update the fields passed in req.body
      { new: true }         // return the updated document instead of the old one
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment with this ID does not exist" });
    }

      // Populate username before sending response
      const populatedComment = await CommentModel.findById(updatedComment._id)
      .populate("user", "username"); // only get username from user
    return res.status(200).json({
      message: "Comment updated successfully",
      populatedComment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
export async function DeleteComment(req,res){
  try{

    const commentId = req.params.id;
    const deletedComment = await CommentModel.findByIdAndDelete(commentId)

    if(!deletedComment){
      return res.status(404).json({message:"comment with id do not exist"});
    }

    return res.status(200).json({message:"comment deleted successfully", deletedComment});
  }
  catch(error){
    return res.status(500).json({message:"error has occured in delete",error:error.message});
  }
}