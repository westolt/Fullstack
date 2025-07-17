const Languages = ({ languages }) => {
    return (
        <div>
            <ul>
                {Object.values(languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
        </div>
    )
}

export default Languages