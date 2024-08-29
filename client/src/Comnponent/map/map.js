import React, { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import './map.css'

const Map = () => {

  const [weather,setWeather] = useState(null)
  let apiKey = 'ba2fc15b6296413f6b8aab62ffe3cc49'

    useEffect(()=>{
      
      const map = L.map('map').setView([0,0],13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom:23,
        attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(map)

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        map.setView([latitude,longitude],13)

        fetchweather(latitude,longitude)

        const marker = L.marker([latitude,longitude]).addTo(map)
        marker.bindPopup("you're here").openPopup();
      },(error)=>{
        alert("couldn't get your loction now");
        console.log('location error', error.message)
      })
    }
    else{
      alert('geolocation is not supported in your browser')
    }
    },[])

        const fetchweather = async(lat,lon)=>{
          try {
            console.log(typeof lat,lon)
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=ba2fc15b6296413f6b8aab62ffe3cc49`)
            setWeather(res.data)
          } catch (error) {
            console.log(error.response.data)
          }
        }

  return (
    <div>
    <div id='map' style={{width:'100%',height:'300px'}}></div>
    {
      weather && (
        <div className='weather-container'>
          <p>{weather.name}</p>
          <p>temperature: {weather.main.temp} Celcius</p>
          <p>Weather : {weather.weather[0].description}</p>
        </div>
      )
    }
    </div>
  )
}

export default Map




