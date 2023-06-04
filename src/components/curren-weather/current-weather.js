import "./current-weather.css"

const CurrentWeather = ({data}) => {
    return (
        <div className="weather">
            <p className="card-current__title">Current Weather</p>
            <div className="detail-weather__container">
                <div className="left">
                    <div>
                        <p className="city">{data.city}</p>
                    </div>
                    <div className="temperature-img__container">
                        <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`}></img>
                        <p className="temperature">{Math.round(data.main.temp)}°C</p>
                    </div>
                    <p className="weather-description">{data.weather[0].description}</p>
                </div>
                <div className="right">
                    <div className="details">
                        <div className="parameter-label__container">
                            <span className="parameter_label-title">Details</span>
                        </div>
                        <div className="parameter-row">
                            <div className="detail-label__container">
                                <span className="parameter-label">Feels like: </span>
                            </div>
                            <span className="parameter-label">{Math.round(data.main.feels_like)}°C</span>
                        </div>
                        <div className="parameter-row">
                            <div className="detail-label__container">
                                <span className="parameter-label">Wind: </span>
                            </div>
                            <span className="parameter-label">{data.wind.speed} m/s</span>
                        </div>
                        <div className="parameter-row">
                            <div className="detail-label__container">
                                <span className="parameter-label">Humidity: </span>
                            </div>
                            <span className="parameter-label">{data.main.humidity}%</span>
                        </div>
                        <div className="parameter-row">
                            <div className="detail-label__container">
                                <span className="parameter-label">Pressure: </span>
                            </div>
                            <span className="parameter-label">{data.main.pressure} hPa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;