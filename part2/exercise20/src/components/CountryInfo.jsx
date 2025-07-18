import { useState, useEffect } from "react"
import axios from 'axios'
import Languages from "./Languages"

const CountryInfo = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        console.log('effect run, city is now', country.capital)

        if (country.capital) {
            const api_key = import.meta.env.VITE_SOME_KEY
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
            .then(response => {
                setWeather(response.data)
            })
        }
    }, [country.capital])

    return(
        <div>
            <h1>{country.name.common}</h1>
            <div className="basic">
                <p>{country.capital}</p>
                <p>Area {country.area}</p>
            </div>
            <h2>Languages</h2>
            <Languages languages={country.languages} />
            <img className="flag" src={country.flags.png} />
            {weather ?
            <>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>Wind {weather.wind.speed} m/s</p>
            </>
            : <p>No weather data</p>
            }
        </div>
    )
}

export default CountryInfo