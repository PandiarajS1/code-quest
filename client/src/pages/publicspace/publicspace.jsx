import React,{useEffect} from 'react'
import Allfriends from './allfriends'
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar'
import Chatroom from './Chatroom'
import '../../App.css'
import './publicspace.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { useDispatch} from 'react-redux'
// import { getallfriends } from '../../action/friends'


const Publicspace = ({slidein}) => {
  const navigate = useNavigate()
  const curentuser = useSelector((state)=>state.cuurentuserreducer)

  return (
    <div>
    { 
      
        <div className="home-container-1">
        <Leftsidebar slidein={slidein}/>
          <div className="home-container-2">
            <Chatroom />
            <Allfriends/>
          </div>
        </div>
      
    }
    </div>
  )
}

export default Publicspace








