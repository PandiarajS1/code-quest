import mongoose from "mongoose";
import PostSchema from './post.js'


 const userschema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    about:{type:String},
    tags:{type:[String]},
    joinedon:{type:Date,default:Date.now},
    friends:{type:[String]},
    post:[PostSchema]
    
 }) 

 export default mongoose.model("User",userschema)