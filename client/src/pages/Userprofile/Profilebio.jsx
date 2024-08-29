import React from 'react'
import LonginHistory from '../../Comnponent/loginHistory/loginhistory'
import Location from '../../Comnponent/location/location'

const Profilebio = ({currentprofile,currentuser,id}) => {
  return (
    <div>
      <div>
        {currentprofile?.tags.length !==0? (
          <>
          <h4>Tags watched</h4>
          {currentprofile?.tags.map((tag)=>(
            <p key={tag}>{tag}</p>
          ))}
          </>
        ):(
          <p> 0 Tags watched</p>
        )}
      </div>
      <div>{currentprofile?.about ? (
        <> 
        <h4>About</h4>
        <p>{currentprofile?.about}</p>
        </>
      ):(
        <p>No bio found</p>
      )}</div>
      <div>
      { currentuser?.result?._id === id &&(<LonginHistory />)}
      { currentuser?.result?._id === id && <Location/>}
      </div>
    
    </div>
  )
}




export default Profilebio