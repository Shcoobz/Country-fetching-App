import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

// <FontAwesomeIcon icon="fa-solid fa-heart" style={{color: "#e51515",}} />

const ComCountriesList = ({
  data,
  onCountrySelect,
  searchValue,
  setSearchValue,
}) => {
  function renderCountries() {
    return data.map((country, index) => (
      <div key={index} className='country'>
        <div className='country-name-container'>
          <h2 className='country-name'>{country.name.common}</h2>

          <button
            className='fav-btn'
            onClick={() => console.log('Plus btn clicked!')}>
            <FontAwesomeIcon icon={faHeart} className='heart-icon' />
          </button>
        </div>
        <button
          className='learn-more-btn'
          onClick={() => onCountrySelect(country)}>
          Learn More
        </button>
      </div>
    ));
  }

  function renderSearchBar() {
    return (
      <input
        className='search-bar'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder='Search countries...'
      />
    );
  }

  return (
    <div>
      <h1>Countries:</h1>
      {renderSearchBar()}
      <div className='container'>{renderCountries()}</div>
    </div>
  );
};

export default ComCountriesList;
