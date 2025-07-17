const Country = ({ country, showCountry }) => {
    return (
        <p>
            {country.name.common} <button onClick={() => showCountry(country)}>Show</button>
        </p>
    )
}

export default Country