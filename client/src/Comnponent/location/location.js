import React, { useState } from 'react'
import {useDispatch} from  'react-redux'
import {getLocation} from '../../action/getlocation'
import Map from '../map/map'

const Location = () => {

  const dispatch = useDispatch()
  const [Display,setDisplay] = useState(false);
  const [location,setlocation] = useState(null);
  const [weather, setweather] = useState(null);
  
  const handleLocation = () => {
    setDisplay(!Display)
    if(navigator.geolocation){
      // navigator.geolocation.getCurrentPosition((position) => {
      //   const {latitude,longitude} = position.coords
      //   console.log(latitude,longitude)
      //   dispatch(getLocation({latitude,longitude}))
      // })
    } else{
        alert('couldnt access your location')
    }
  }

  

  const dropSection = {
    display : 'block',
    Transition : '0.3'
}

const hideSection = {
    display : 'none'
}

  return (
    <div className='location-container'>
    
    <button onClick={(e)=>{
      handleLocation(e)
    }
    }>{ Display ? 'Hide Location' : 'See Location' }</button>

    <section style={Display ? dropSection : hideSection}  className='location-section'>
      <Map/>
    </section>
    </div>
  )
}

export default Location