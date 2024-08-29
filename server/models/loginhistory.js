import mongoose from "mongoose";

const loginHistorySchema = mongoose.Schema({
    user_id:{
        type:String,
        reqiured: true
    },
    browser: {
        type: String,
        required: true
    },
    os:{
        type:String,
        required:true
    },
    devicetype:{
        type:String,
        required:true
    },
    logintime:{
        type:Date,
        default:Date.now
    },
    ipAddress:{
        type:String,
        required:true
    },

})

export default mongoose.model('loginHistory',loginHistorySchema)