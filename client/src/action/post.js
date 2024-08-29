import * as api from '../api'

import { getallfriends } from './friends'

export const uploadmedia = (formdata,navigate) => async(dispatch) => {
    try{
    const {data} = await api.uploadpost(formdata)
    dispatch({type:'UPLOAD_POST',payload:data})
    navigate('/publicspace')
    }catch(error){
        console.log(error)
    }
}

export const getpost = () => async(dispatch) => {
    try {
        const {data} = await api.getposts()
        dispatch({type:'GET_ALL_POST',payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const uploadcomment = (commentdetails) => async(dispatch) => {
    try {
      const {postid,content,usercommented,userid} = commentdetails;
      const {data} = await api.uploadcomment({postid,content,usercommented,userid})   
      dispatch({type:'UPLOAD_COMMENT',payload:data})
      dispatch(getpost())
    } catch (error) {
        console.log(error)
    }
}