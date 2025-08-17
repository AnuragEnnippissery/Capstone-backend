import CommentModel from "../models/comment.model.js";

export async function InsertComment(req,res){
    try{
        const {user,text}=req.body;
        const newComment=new CommentModel({
            user,
            text
        })
        await newComment.save() // insert into db

    }
    catch (err) {
    res.status(500).json({ error: err.message });
  }
}