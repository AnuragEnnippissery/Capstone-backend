import { InsertVideos } from "../controllers/video.controller.js";

export function VideoRoutes(app){
    app.post("/api/videos/add",InsertVideos);
}