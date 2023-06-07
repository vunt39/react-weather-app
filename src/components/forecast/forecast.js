import './forecast.css'
import { useState } from "react";
import SearchDayForecast from "../select_day_forecast/select_day_forecast";

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', "Sun"];


const Forecast = ({ data }) => {
    let city = data ? data.city.name : ''
    const dayInWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
        WEEK_DAYS.slice(0, dayInWeek)
    );

    const [dataDayForecast, setDataDayForecast] = useState(null) 

    const numberDayDisplay = dataDayForecast ? dataDayForecast : 7

    const handleOnChangeDayForecast = (searchDataDayForecast) => {
        setDataDayForecast(searchDataDayForecast.value)
    }

    return (
        <div>
            <div className="forecast">
                <div className="card-title__container">
                    <p className="card-forecast__title">Extended Forecast {city}</p>
                    <div className="select-container">
                        <SearchDayForecast onSearchChangeDayForecast={handleOnChangeDayForecast}/>
                    </div>
                </div>
                <div className="detail-forecast__container">
                    {data.list.slice(0, numberDayDisplay).map((item, idx) => (
                        <div className="daily-item">
                            <label className="day">{forecastDays[idx]}</label>
                            <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`}></img>
                            <label className="description">{item.weather[0].main}</label>
                            <label className="min-max">{
                                Math.round(item.main.temp_min)}°C / {" "}
                                {Math.round(item.main.temp_max)}°C
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Forecast;