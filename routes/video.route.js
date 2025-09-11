import { DeleteVideo, GetSingleVideo, GetVideos, InsertVideos, UpdateVideo } from "../controllers/video.controller.js";
import { AuthenticateUser } from "../controllers/user.controller.js";

export function VideoRoutes(app){
    app.post("/api/videos/add",AuthenticateUser,InsertVideos);
    app.get("/api/videos",GetVideos);
    app.put("/api/videos/update/:id",AuthenticateUser,UpdateVideo);
    app.delete("/api/videos/delete/:id",AuthenticateUser,DeleteVideo);
    app.get("/api/video/:id",AuthenticateUser,GetSingleVideo);
}