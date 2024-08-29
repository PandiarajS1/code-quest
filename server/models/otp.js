import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    user_email: {type:String,required:true},
    otp: {type:String,required:true},
    createdAt:{type:Date},
    expireAt: {type:Date}
})

export default mongoose.model('otpModel',otpSchema)