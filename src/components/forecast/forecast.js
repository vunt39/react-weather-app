import { Accordion, AccordionItemHeading, AccordionItemButton, AccordionItem, AccordionItemPanel } from "react-accessible-accordion";
import './forecast.css'


const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', "Sun"];


const Forecast = ({ data, numberDay }) => {
    const dayInWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
        WEEK_DAYS.slice(0, dayInWeek)
    );

    const numberDayDisplay = numberDay ? numberDay : 7

    return (
        <div>
            <div className="forecast">
                <p className="card-forecast__title">Extended Forecast</p>
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
            {/* <>
                <label className="title">Daily</label>
                <Accordion allowZeroExpanded>
                    {data.list.slice(0, numberDayDisplay).map((item, idx) => (
                        <AccordionItem key={idx}>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    <div className="daily-item">
                                        <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`}></img>
                                        <label className="day">{forecastDays[idx]}</label>
                                        <label className="description">{item.weather[0].description}</label>
                                        <label className="min-max">{
                                            Math.round(item.main.temp_min)}°C / {" "}
                                            {Math.round(item.main.temp_max)}°C
                                        </label>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className="daily-details-grid">
                                    <div className="daily-details-grid-item">
                                        <label>Pressure: </label>
                                        <label>{item.main.pressure}</label>
                                    </div>
                                    <div className="daily-details-grid-item">
                                        <label>Humidity: </label>
                                        <label>{item.main.humidity}</label>
                                    </div>
                                    <div className="daily-details-grid-item">
                                        <label>Clouds: </label>
                                        <label>{item.clouds.all}%</label>
                                    </div>
                                    <div className="daily-details-grid-item">
                                        <label>Wind speed: </label>
                                        <label>{item.wind.speed} m/s</label>
                                    </div>
                                    <div className="daily-details-grid-item">
                                        <label>Sea level: </label>
                                        <label>{item.main.sea_level}</label>
                                    </div>
                                    <div className="daily-details-grid-item">
                                        <label>Feels like: </label>
                                        <label>{Math.round(item.main.feels_like)}°C</label>
                                    </div>
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </> */}
        </div>
    )
}

export default Forecast;