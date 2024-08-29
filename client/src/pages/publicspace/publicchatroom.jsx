import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './publicspace.css'
import Postsection from './postsection';
import { useDispatch, useSelector } from 'react-redux';

const Publicchatroom = () => {

  const allfriends =  useSelector((state)=>state.friendreducer.data)
  const HandleFriendChat = () => {
    
  }

  return (
    <div className='main-chat-room'>
    <div className='main-chat-room-header'>
      <p>welcome!</p>
      <p>Hello, User</p>
      </div>
      <div className='mobile-view-friendlist'>
      <div className='friendslist-scroll'>
      {
        allfriends.map((user) => (
          <button className="friends-scroll-container" onClick={HandleFriendChat}>
          <div className="friend-scroll-container">
            <Link to={`/Users/`} className="users-profile-scroll-link">
              <h3>{user.name.charAt(0).toUpperCase()}</h3>
            </Link>
            <h5>{user.name}</h5>
          </div>
          </button>
        ))
      }
      </div>
    </div>

    <Postsection/>
     
    </div>
  )
 
}

export default Publicchatroom