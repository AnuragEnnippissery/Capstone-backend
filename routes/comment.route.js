import { InsertComment } from "../controllers/comment.controller.js";


export  function CommentRoutes(app){
    app.post("/api/comment/add",InsertComment)
} 