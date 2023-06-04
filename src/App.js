import './App.css';
import Search from './components/search/search'
import CurrentWeather from './components/curren-weather/current-weather';
import Forecast from './components/forecast/forecast';
import HourlyForecast from './components/hourly_forecast/hourly_forecast';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { GEO_API_URL, geoApiOptions } from "./api";
import { useEffect, useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [hourlyForecast, setForecastHourly] = useState(null)
  
  useEffect(() => {
    
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   setCurrentPosition(position.coords.latitude + ' ' + position.coords.longitude);
    //   setLong(position.coords.longitude);
    //   setLat(position.coords.latitude)
    // });

    const currentPositionFetch = fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=Hanoi`, 
          geoApiOptions
      )

    currentPositionFetch
    .then(response => response.json())
    .then(response => {
      let search_data_init = {
        value: response.data[0].latitude + ' ' + response.data[0].longitude,
        label: `${response.data[0].name}, ${response.data[0].countryCode}`
      }
      handleOnSearchChange(search_data_init)
      // setCurrentWeather({city: response.data[0].city, ...weatherResponse})
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ")

    console.log(searchData.value)
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&exclude=daily&appid=${WEATHER_API_KEY}&units=metric`)
    const hourlyForecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&exclude=hourly&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch, hourlyForecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const hourlyForecastResponse = await response[2].json()

        setCurrentWeather({city: searchData.label, ...weatherResponse})
        setForecast({ city: searchData.label, ...forecastResponse})
        setForecastHourly({city: searchData.label, ...hourlyForecastResponse})
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <h1 className='weather_app-title'>React Weather</h1>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather &&  <CurrentWeather data={currentWeather} />}
      {hourlyForecast && <HourlyForecast data={hourlyForecast}/>}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
