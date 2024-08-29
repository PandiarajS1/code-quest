import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    filepath: {type:String},
    userPosted : {type:String, required:true},
    userid :{type:String,},
    description :{type:String, required:true},
    isLiked :{type:String},
    likes:{type:Map, of:Boolean},
    postedon :{type:Date , default:Date.now},
    comment :[ {
        postid:{type:String},
        userid:{type:String},
        content:{type:String},
        usercommented:{type:String},
        Commentedon:{type:Date,default:Date.now}
    } ]
})

export default PostSchema