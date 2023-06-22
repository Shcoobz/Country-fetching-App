const ComCountriesList = ({ data, onCountrySelect }) => {
  function renderCountries() {
    return data.map((country, index) => (
      <div key={index} className='country'>
        <h2>{country.name.common}</h2>
        <button
          className='learn-more-btn'
          onClick={() => onCountrySelect(country)}>
          Learn More
        </button>
      </div>
    ));
  }

  return (
    <div>
      <h1>Countries:</h1>
      <div className='container'>{renderCountries()}</div>
    </div>
  );
};

export default ComCountriesList;
