import InsertChannel, { GetAllChannel, GetSingleChannel } from "../controllers/channel.controller.js";

export default function ChannelRoutes(app){
    app.post("/api/channel/add",InsertChannel);
    app.get("/api/channel",GetAllChannel);
    app.get("/api/channel/:id",GetSingleChannel);
}