import user from '../models/auth.js'

export const addremovefriends = async(req,res) => {
    const {id:friendid} = req.params;
    const userid = req.userid;
    try {
        const currentuser = await user.findById(userid) 
        const friend = await user.findById(friendid)

        if(currentuser.friends.includes(friendid)){
           currentuser.friends = currentuser.friends.filter((id)=>id !== friendid)
           friend.friends = currentuser.friends.filter((id)=>id !== userid)
        }else{
            currentuser.friends.push(friendid)
            friend.friends.push(userid)
        }
        await currentuser.save()
        await friend.save()
        res.status(200).json('friends list updated')
    } catch (error) {
        res.status(404).json({message:'friends list cannot be updated',error:error.message})
    }
}

export const getallfriends = async(req,res) => {
    const userid = req.userid
    try {
        const currentuser = await user.findById(userid)

        const friends = await Promise.all(
            currentuser.friends.map((id)=>user.findById(id))
        )
        res.status(200).json(friends)

    } catch (error) {
        res.status(404).json({message:'could get all your friends'})
    }
}

