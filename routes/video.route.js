import { GetSingleVideo, GetVideos, InsertVideos } from "../controllers/video.controller.js";

export function VideoRoutes(app){
    app.post("/api/videos/add",InsertVideos);
    app.get("/api/videos",GetVideos);
    app.get("/api/video/:id",GetSingleVideo);
}