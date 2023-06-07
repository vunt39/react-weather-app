import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({onSearchChange}) => {
    const [search, setSearch] = useState('Hanoi');

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, 
            geoApiOptions
        )
        .then(response => response.json())
        .then(response => {
            return {
                options: response.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`
                    }
                })
            }
        })
        .catch(err => console.log(err))
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: '15px',
            boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
            cursor: 'auto'
        }),
    }

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            styles={customStyles}
        />
    )
}

export default Search;