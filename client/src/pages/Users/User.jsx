import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {handlefriends} from '../../action/friends'


const User = ({user}) => {

  const dispatch = useDispatch();

    const currentuser=useSelector((state)=>state.currentuserreducer)
    const currentuserpost = useSelector((state)=>state.postreducer.data)

    const currentpost = currentuserpost.filter((userdetails)=>(
      userdetails._id === currentuser.result._id
    )).map((currentpost)=>currentpost.friends)

    const allfriends = currentpost.flat(1)
    let content
    if(allfriends.includes(user._id)){
       content = <span>remove</span>
    }else{
       content = <span>add</span>
    }


  const Handleaddfriend = (e,friendid) => {
    e.preventDefault();
    dispatch(handlefriends(friendid))
    }
  


  return (
    <div className='user-page-section'>
   <Link to ={`/Users/${user._id}`} className='user-profile-link'>
    <h3>{user.name.charAt(0).toUpperCase()}</h3>
    
   </Link>
   <div className='user-body'>
   <h5>{user.name}</h5>
   {
    currentuser.result._id !== user._id && ( <button  onClick={(e)=>{
      Handleaddfriend(e,user._id)
    }}>{content} friend</button> )
   }
   </div>
    </div>
  )
}

export default User