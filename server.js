import express from "express"
import mongoose from "mongoose"
import UserRoutes from "./routes/user.route.js"
import cors from "cors"
import { CommentRoutes } from "./routes/comment.route.js"
import { VideoRoutes } from "./routes/video.route.js"
import ChannelRoutes from "./routes/channel.routes.js"

const app=express()
app.use(express.json())
app.use(cors())
UserRoutes(app)
CommentRoutes(app)
VideoRoutes(app)
ChannelRoutes(app)





mongoose.connect("mongodb+srv://anuragramesh608:IVrYvEH8kFAXcyoJ@cluster0.tapnixt.mongodb.net/")
const db=mongoose.connection

db.on("open",()=>{
    console.log("successfull")
})
db.off("error",()=>{
    console.log("not successfull")
})

app.listen(3100,()=>{
    console.log("server is running")
})
