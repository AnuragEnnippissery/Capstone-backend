import ChannelModel from "../models/channel.model.js";

export default async function InsertChannel(req,res){
    try{
        const{channelName,owner,description,channelBanner,subscribers,videos}=req.body;
        const newChannel=new ChannelModel({
            channelName,
            owner,
            description,
            channelBanner,
            subscribers,
            videos
        })
        await newChannel.save() // insert into db
        res.status(201).json({ message: "Channel created successfully", channel: newChannel });
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}