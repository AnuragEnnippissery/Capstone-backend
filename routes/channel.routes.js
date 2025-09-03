import InsertChannel from "../controllers/channel.controller.js";

export default function ChannelRoutes(app){
    app.post("/api/channel/add",InsertChannel);
}