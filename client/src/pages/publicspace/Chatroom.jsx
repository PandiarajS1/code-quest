import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './publicspace.css'
import Publicchatroom from './publicchatroom'
import {useSelector } from 'react-redux'


const Chatroom = () => {

  const allfriends =  useSelector((state)=>state.friendreducer.data)
  
  return (
    <div className='chatroom-container'>
    
    { 
      allfriends.length === 0 ?
      <div className='chatroom-front-face'>
      <Link to={`/Users`}><button>add friends</button></Link>
        <div className='front-face-description'>
        <h6>you should have friends to share posts. add more friends to have this public space
        </h6>
        </div>
      </div>
      :
      <div className='publicchatroom-container'>
        <Publicchatroom/>
      </div>

    }
    </div>
  )
}

export default Chatroom