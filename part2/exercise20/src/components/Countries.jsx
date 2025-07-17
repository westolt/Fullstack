import Country from "./Country";

const Countries = ({ countries, showCountry }) => {
    return(
        <ul>
            {countries.map(country =>
            <Country
            key={country.cca2}
            country={country}
            showCountry={showCountry}
            />
            )}
        </ul>
    )
}

export default Countries