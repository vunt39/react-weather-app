import Select from "react-select";
import { useState } from "react";
import './select_day_forecast.css'

const SearchDayForecast = ({onSearchChangeDayForecast}) => {
    const [searchDayForecast, setSearchDayForecast] = useState(null);

    const optionsSelectDayForecast = [
        {
            value: 1,
            label: '1 days'
        },
        {
            value: 2,
            label: '2 days'
        },
        {
            value: 3,
            label: '3 days'
        },
        {
            value: 4,
            label: '4 days'
        },
        {
            value: 5,
            label: '5 days'
        },
        {
            value: 6,
            label: '6 days'
        },
        {
            value: 7,
            label: '7 days'
        },
    ]

    const handleOnChangeDayForecast = (searchData) => {
        setSearchDayForecast(searchData);
        onSearchChangeDayForecast(searchData)
    }

    return (
        <Select
            placeholder="Select number of days to forecast"
            onChange={handleOnChangeDayForecast}
            defaultValue={optionsSelectDayForecast[6]}
            options={optionsSelectDayForecast}
            className="select-component"
            classNamePrefix="react-select"
        />
    )
}

export default SearchDayForecast;