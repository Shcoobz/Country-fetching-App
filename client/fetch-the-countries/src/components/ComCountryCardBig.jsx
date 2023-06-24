function ComCountryCardBig({ country, onBack }) {
  return (
    <div>
      <div className='country-container'>
        <h2>{country.name.common}</h2>
        <div className='flag'>
          <img src={country.flags.svg} alt='flag' style={{ width: '500px' }} />
        </div>
        <div className='country-info'>
          <div className='info-item'>
            <p className='info-label'>Official Name:</p>
            <p className='info-value split-text'>{country.name.official}</p>
          </div>
          <div className='info-item'>
            <p className='info-label'>Region:</p>
            <p className='info-value'>{country.region}</p>
          </div>
          <div className='info-item'>
            <p className='info-label'>Sub Region:</p>
            <p className='info-value'>{country.subregion}</p>
          </div>
          <div className='info-item'>
            <p className='info-label'>Capital:</p>
            <p className='info-value'>
              {country.capital && country.capital[0]}
            </p>
          </div>
          <div className='info-item'>
            <p className='info-label'>Area:</p>
            <p className='info-value'>{country.area} sq km</p>
          </div>
          <div className='info-item'>
            <p className='info-label'>Population:</p>
            <p className='info-value'>{country.population}</p>
          </div>
          <div className='info-item'>
            <p className='info-label'>Currency:</p>
            <p className='info-value'>
              {Object.values(country.currencies)[0].name}
            </p>
          </div>
          <div className='info-item'>
            <p className='info-label'>Timezones:</p>
            <p className='info-value'>
              {country.timezones && country.timezones.join(', ')}
            </p>
          </div>
          <div className='info-item'>
            <p className='info-label'>Continent:</p>
            <p className='info-value'>{country.continents[0]}</p>
          </div>
        </div>
      </div>
      <button className='back-btn' onClick={onBack}>
        Back
      </button>
    </div>
  );
}

export default ComCountryCardBig;
