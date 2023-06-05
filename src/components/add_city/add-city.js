import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";

const SearchAddCity = ({onSearchChange}) => {
    const [search, setSearch] = useState(null);

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
            // border: '2px solid #ccc',
            // boxShadow: state.isFocused ? '0 0 0 2px #3699FF' : null,
        }),
        // option: (provided, state) => ({
        //     ...provided,
        //     backgroundColor: state.isFocused ? '#3699FF' : null,
        //     color: state.isFocused ? 'white' : null,
        // }),
    }

    return (
        <AsyncPaginate
        placeholder="Add city to follow"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        styles={customStyles}
        />
    )
}

export default SearchAddCity;