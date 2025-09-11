import { GetSingleVideo, GetVideos, InsertVideos } from "../controllers/video.controller.js";
import { AuthenticateUser } from "../controllers/user.controller.js";

export function VideoRoutes(app){
    app.post("/api/videos/add",AuthenticateUser,InsertVideos);
    app.get("/api/videos",AuthenticateUser,GetVideos);
    app.get("/api/video/:id",AuthenticateUser,GetSingleVideo);
}