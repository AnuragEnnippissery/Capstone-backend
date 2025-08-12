import express from "express"
import mongoose from "mongoose"
import UserRoutes from "./routes/user.route.js"

const app=express()
app.use(express.json())
UserRoutes(app)






mongoose.connect("mongodb+srv://anuragramesh608:IVrYvEH8kFAXcyoJ@cluster0.tapnixt.mongodb.net/")
const db=mongoose.connection

db.on("open",()=>{
    console.log("successfull")
})
db.off("error",()=>{
    console.log("not successfull")
})

app.listen(3100,()=>{
    console.log("server is runing")
})
