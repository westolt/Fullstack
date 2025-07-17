import Languages from "./Languages"

const CountryInfo = ({ country }) => {
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
        </div>
    )
}

export default CountryInfo