import { DeleteComment, InsertComment, UpdateComment } from "../controllers/comment.controller.js";


export  function CommentRoutes(app){
    app.post("/api/comment/add",InsertComment)
    app.put("/api/comment/update/:id",UpdateComment)
    app.delete("/api/comment/delete/:id",DeleteComment)
} 