import { DeleteComment, InsertComment, UpdateComment } from "../controllers/comment.controller.js";
import { AuthenticateUser } from "../controllers/user.controller.js";


export  function CommentRoutes(app){
    app.post("/api/comment/add",InsertComment)
    app.put("/api/comment/update/:id",AuthenticateUser,UpdateComment)
    app.delete("/api/comment/delete/:id",AuthenticateUser,DeleteComment)
} 