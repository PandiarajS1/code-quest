import * as api from '../api'
import {getpost} from './post'

export const handlefriends = (friendid) => async (dispatch) => {
    try {
        const {data} = await api.handlefriends(friendid)
        dispatch({type:'HANDLE_FRIENDS',payload:data})
        dispatch(getpost())
        dispatch(getallfriends())
    } catch (error) {
        console.log(error)
    }
}

export const getallfriends = () => async(dispatch) =>{
   try {
    const {data} =await api.getallfriends();
    dispatch({type:'GET_ALL_FRIENDS',payload:data})
    dispatch(getpost())
   } catch (error) {
        console.log(error)
   }
}