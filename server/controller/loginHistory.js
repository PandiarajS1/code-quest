import loginhistory from "../models/loginhistory.js";

export const getloginHistory = async(req,res) => {

    const userid = req.userid
    try {
        const loginData = await loginhistory.find()

        const currentlog = loginData.filter((log)=>log.user_id === userid)
        res.status(200).json(currentlog)
    } catch (error) {
        res.status(404).json({message:'login history fetchimg issue'})
        return
    }

}
