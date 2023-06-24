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
  function handleFavoriteToggle(country) {
    const isFavorite = favorites.some(
      (fav) => fav.name.common === country.name.common
    );

    if (isFavorite) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.name.common !== country.name.common)
      );
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, country]);
    }
  }

  function renderCountries() {
    return data.map((country, index) => (
      <ComCountryCardSmall
        key={index}
        country={country}
        favorites={favorites}
        handleFavoriteToggle={handleFavoriteToggle}
        onCountrySelect={onCountrySelect}
      />
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
      <div className='container'> {renderCountries(handleFavoriteToggle)}</div>
    </div>
  );
};

export default ComCountriesList;
