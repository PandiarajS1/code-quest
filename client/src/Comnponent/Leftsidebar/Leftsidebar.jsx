import React from 'react'
import './Leftsidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from "../../assets/Globe.svg"
import { useSelector } from 'react-redux'
const Leftsidebar = ({ slidein }) => {

  const currentuser = useSelector((state)=>state.currentuserreducer)

  const slideinstyle = {
    transform: "translateX(0%)",
  };
  const slideoutstyle = {
    transform: "translateX(-100%)",
  }
  return (
    <div className="left-sidebar" style={slidein ? slideinstyle : slideoutstyle}>
      <nav className='side-nav'>
        <button className="nav-btnn">
          <NavLink to='/' className="side-nav-links" activeclassname='active'>
            <p>Home</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
          <button className='nav-btnn'>
            <NavLink to='/Question' className='side-nav-links' activeclassname='active'>
            <img src={Globe} alt="globe" />
            <p style={{paddingLeft:'10px'}}>Questions</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/Tags' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p >Tags</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink onClick={()=>!currentuser && alert('login before')} to={currentuser ? '/Users' : '/auth'} className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p >Users</p>
            </NavLink>
            <NavLink onClick={()=>!currentuser && alert('login before')} to={currentuser ? '/publicspace' : '/auth'} className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
             
            <p >public Space</p> 
           
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Leftsidebar