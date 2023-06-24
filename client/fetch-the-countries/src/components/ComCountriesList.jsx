import ComCountryCardSmall from './ComCountryCardSmall';

const ComCountriesList = ({
  data,
  onCountrySelect,
  searchValue,
  setSearchValue,
  favorites,
  setFavorites,
  handleFavoriteToggle,
}) => {
  const renderedCountries = data.map(renderCountry);

  function checkIsFavorite(country) {
    return favorites.some((fav) => fav.name.common === country.name.common);
  }

  function addFavorite(country) {
    setFavorites((prevFavorites) => [...prevFavorites, country]);
  }

  function removeFavorite(country) {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.name.common !== country.name.common)
    );
  }

  function handleFavoriteToggle(country) {
    if (checkIsFavorite(country)) {
      removeFavorite(country);
    } else {
      addFavorite(country);
    }
  }

  function renderCountry(country, index) {
    return (
      <ComCountryCardSmall
        key={index}
        country={country}
        favorites={favorites}
        handleFavoriteToggle={handleFavoriteToggle}
        onCountrySelect={onCountrySelect}
      />
    );
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
      <div className='container'>{renderedCountries}</div>
    </div>
  );
};

export default ComCountriesList;
