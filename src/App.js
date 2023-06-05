import './App.css';
import Search from './components/search/search'
import CurrentWeather from './components/curren-weather/current-weather';
import Forecast from './components/forecast/forecast';
import HourlyForecast from './components/hourly_forecast/hourly_forecast';
import SearchAddCity from './components/add_city/add-city';
import Modal from 'react-modal'
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { GEO_API_URL, geoApiOptions } from "./api";
import { useEffect, useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [hourlyForecast, setForecastHourly] = useState(null)
  const [modalOpen, setModalOpen] = useState(false);
  const [cityAddFollow, setCityAddFollow] = useState(null)
  const [listCityFollow, setListCityFollow] = useState([])
  
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

  const handleAddCityFollow = (searchData) => {
    const [lat, lon] = searchData.value.split(" ")

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&exclude=daily&appid=${WEATHER_API_KEY}&units=metric`)
    const hourlyForecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&exclude=hourly&appid=${WEATHER_API_KEY}&units=metric`)

    let dataAdd = {

    }

    Promise.all([currentWeatherFetch, forecastFetch, hourlyForecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const hourlyForecastResponse = await response[2].json()

        dataAdd.currentWeather = {city: searchData.label, ...weatherResponse}
        dataAdd.forecast = { city: searchData.label, ...forecastResponse}
        dataAdd.hourlyForecast = {city: searchData.label, ...hourlyForecastResponse}

        console.log('data', dataAdd)
        console.log('listCityFollow', listCityFollow)
        let a = JSON.parse(JSON.stringify(listCityFollow))
        a.push(dataAdd)
        console.log('aaa', a)
        setListCityFollow(a)
        // console.log('222', listCityFollow)

        // setCurrentWeather({city: searchData.label, ...weatherResponse})
        // setForecast({ city: searchData.label, ...forecastResponse})
        // setForecastHourly({city: searchData.label, ...hourlyForecastResponse})
      })
      .catch((err) => console.log(err));
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: 400,
      height: 250,
    },
  };

  var cityAdd = null

  const handleOnSearchAddCity = (searchData) => {
    console.log('searchData', searchData)
    cityAdd = searchData
  }

  const clickOpenModal = () => {
    setModalOpen(true)
    cityAdd = null
    console.log('click modal open', cityAdd)
  }

  const clickCloseModal = () => {
    console.log('click close modal')
    if(cityAdd){
      setCityAddFollow(cityAdd)
      handleAddCityFollow(cityAdd)
    }
    setModalOpen(false)
    console.log('add city', cityAdd)
  }

  const clickDelete = (idx) => {
    let a = (listCityFollow.splice(idx, 1))
    console.log('aaaaaaa', a)
    setListCityFollow(a)
    // listCityFollow.slice(idx, 1)
  }

  return (
    <div className="container">
      <h1 className='weather_app-title'>React Weather</h1>
      <Search onSearchChange={handleOnSearchChange}/>
      <button className='button' onClick={clickOpenModal}>Open Modal</button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
      >
        <SearchAddCity onSearchChange={handleOnSearchAddCity} />
        <div className='button-city__container'>
          <button className='button button-city' onClick={clickCloseModal}>Close Modal (add city)</button>
        </div>
      </Modal>
      <div>
        {listCityFollow.slice(0).reverse().map((item, idx) => (
          <div className='list-city-follow'>
            <img className='delete-image' onClick={() => clickDelete(idx)} src='delete.png' alt=""></img>
            {item.currentWeather &&  <CurrentWeather data={item.currentWeather} />}
            {/* {item.hourlyForecast && <HourlyForecast data={item.hourlyForecast}/>} */}
            {item.forecast && <Forecast data={item.forecast} />}
          </div>
        ))}
      </div>
      {currentWeather &&  <CurrentWeather data={currentWeather} />}
      {hourlyForecast && <HourlyForecast data={hourlyForecast}/>}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
