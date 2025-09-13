import InsertChannel, { DeleteChannel, GetAllChannel, GetMyChannel, GetSingleChannel, UpdateChannel } from "../controllers/channel.controller.js";
import { AuthenticateUser } from "../controllers/user.controller.js";

export default function ChannelRoutes(app){
    app.post("/api/channel/add",AuthenticateUser,InsertChannel);
    app.get("/api/channel",GetAllChannel);
    //app.get("/api/channel/:id",AuthenticateUser,GetSingleChannel);
    app.get("/api/channel/mychannel",AuthenticateUser,GetMyChannel);
    app.put("/api/channel/update/:id",AuthenticateUser,UpdateChannel);
    app.delete("/api/channel/delete/:id",AuthenticateUser,DeleteChannel);
    app.get("/api/channel/:id",AuthenticateUser,GetSingleChannel);
}