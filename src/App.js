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

        let a = JSON.parse(JSON.stringify(listCityFollow))
        a.unshift(dataAdd)
        setListCityFollow(a)

      })
      .catch((err) => console.log(err));
  }

  var cityAdd = null

  const handleOnSearchAddCity = (searchData) => {
    cityAdd = searchData
  }

  const clickOpenModal = () => {
    setModalOpen(true)
    cityAdd = null
  }

  const clickCloseModal = () => {
    if(cityAdd){
      setCityAddFollow(cityAdd)
      handleAddCityFollow(cityAdd)
    }
    setModalOpen(false)
  }

  const clickDelete = (idx) => {
    let a = JSON.parse(JSON.stringify(listCityFollow))
    a.splice(idx, 1)
    setListCityFollow(a)
  }

  var draggedItem = null
  var itemsSetArray = null

  const onDragStart = (e, index) => {
    draggedItem = listCityFollow[index]
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    // e.dataTransfer.setDragImage(e.target.parentNode, 0, 0);
  }

  const  onDragOver = index => {
    const draggedOverItem = listCityFollow[index];

    if (draggedItem === draggedOverItem) {
      return;
    }

    let items = listCityFollow.filter(item => item !== draggedItem);



    if(draggedItem !== null){
      items.splice(index, 0, draggedItem);
      itemsSetArray = items
    }
  };

  const onDragEnd = index => {
    if(itemsSetArray !== null){
      setListCityFollow(itemsSetArray)
    }

    itemsSetArray = null
    draggedItem = null
  };

  return (
    <div className="container">
      <h1 className='weather_app-title'>React Weather</h1>
      <div className='header-app__container'>
        <div className='search-app__container'>
          <Search onSearchChange={handleOnSearchChange}/>
        </div>
        <button className='button' onClick={clickOpenModal}>Follow city</button>
      </div>
      <Modal
        isOpen={modalOpen}
        className={'modal-add-city'}
        onRequestClose={() => setModalOpen(false)}
        // style={customStyles}
      >
        <div className='content-modal__container'>
          <div className='modal-title'>
            <h3>CHOOSE A CITY TO FOLLOW</h3>
          </div>
          <SearchAddCity onSearchChange={handleOnSearchAddCity} />
          <div className='description__container'>
            <p>
              If choose this city. The information of it will be displayed in the dashboard and you will can delete it anytime you want
            </p>
          </div>
          <div className='button-city__container'>
            <button className='button button-city' onClick={clickCloseModal}>Add this city</button>
          </div>
        </div>
      </Modal>
      <div>
        {listCityFollow.map((item, idx) => (
          <div key={idx} onDragOver={() => onDragOver(idx)}>
            <div className='list-city-follow' draggable onDragStart={e => onDragStart(e, idx)} onDragEnd={() => onDragEnd(idx)}>
              <img className='delete-image' onClick={() => clickDelete(idx)} src='delete.png' alt=""></img>
              {item.currentWeather &&  <CurrentWeather data={item.currentWeather} />}
              {/* {item.hourlyForecast && <HourlyForecast data={item.hourlyForecast}/>} */}
              {item.forecast && <Forecast data={item.forecast} />}
            </div>
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
