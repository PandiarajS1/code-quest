import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./publicspace.css";
import { useSelector } from "react-redux";
import { all } from "axios";



const Allfriends = () => {

  const HandleFriendChat = () => {
    
  }

  const allfriends =  useSelector((state)=>state.friendreducer.data)

  return (
    <div className="allfriends-container">
      <div className="allfriends-container-header">
        <h3>Your Friends</h3>
      </div>
      {
         allfriends.map((friend)=>(
          <button className="friends-container" onClick={HandleFriendChat}>
          <div className="friend-container">
            <Link to={`/publicspace/${friend._id}`} className="users-profile-link">
              <h3>{friend.name.charAt(0).toUpperCase()}</h3>
            </Link>
            <h5>{friend.name}</h5>
          </div>
          </button>
         ))
        }
    </div>
  );
};

export default Allfriends;
