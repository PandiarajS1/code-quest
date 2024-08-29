import mongoose from "mongoose";
import user from "../models/auth.js";

export const createpost = async(req,res) => {
    
    const {userPosted,isliked,description,filepath}  = req.body;
    const userid = req.userid;
    try {

    const createpost = await user.findByIdAndUpdate(userid,{
        $addToSet:{post:[{filepath,userPosted,isliked,description,userid}]}
    })
    res.status(200).json(createpost)

    } catch (error) {
        res.status(404).json({message:'backend error'})
    }
}

export const getallpost = async(req,res)=>{
    try {
        const users = await user.find()
        res.status(200).json(users)
        
    } catch (error) {
        res.status(404).json({message:'cannot get data'})
        return
    }
}


export const uploadcomment = async (req,res) => {
    const {id:postid} = req.params;
    console.log(postid)
    const {content,usercommented,userid} = req.body;
    const currentuserid = req.userid;
    if (!mongoose.Types.ObjectId.isValid(postid)) {
        return res.status(404).send("post unavailable...");
    }
    try {
        const comment = await user.updateOne(
            {_id:userid,'post._id':postid},
            {$addToSet:{'post.$.comment':[{content,usercommented,userid:currentuserid,postid}]}}
        )
        res.status(200).json({message:'updated the comment'})

    } catch (error) {
        res.status(404).json({message:'something went wrong',error: error.message})
        return
    }
}