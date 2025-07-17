import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    setSelectedCountry(null)
    countryService
      .getAll()
      .then(initialCountries => {
        console.log('promise fulfilled')
        setCountries(initialCountries)
      })
  }, [newFilter])
  console.log('render', countries.length, 'countries')

  const countriesToShow = newFilter
  ? countries.filter(country =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase())
  )
  : countries

  const showCountry = (country) => {
    setSelectedCountry(country)
    console.log('selectedCountry:', selectedCountry)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
        <Filter value={newFilter} onChange={handleFilterChange} />

        {selectedCountry
        ? <CountryInfo country={selectedCountry} />
        : countriesToShow.length > 10
        ? <p>Too many matches, specify another filter</p>
        : countriesToShow.length === 1
        ? <CountryInfo country={countriesToShow[0]} />
        : countriesToShow.length > 1 ? <Countries countries={countriesToShow} showCountry={showCountry}/>
        : <p>No matches found</p>
        }
    </div>
  )

}

export default App