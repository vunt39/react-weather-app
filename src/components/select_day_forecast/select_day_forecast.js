import Select from "react-select";
import { useState } from "react";

const SearchDayForecast = ({onSearchChangeDayForecast}) => {
    const [searchDayForecast, setSearchDayForecast] = useState(null);

    const optionsSelectDayForecast = [
        {
            value: 1,
            label: '1 ngày'
        },
        {
            value: 2,
            label: '2 ngày'
        },
        {
            value: 3,
            label: '3 ngày'
        },
        {
            value: 4,
            label: '4 ngày'
        },
        {
            value: 5,
            label: '5 ngày'
        },
        {
            value: 6,
            label: '6 ngày'
        },
        {
            value: 7,
            label: '7 ngày'
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
        />
    )
}

export default SearchDayForecast;