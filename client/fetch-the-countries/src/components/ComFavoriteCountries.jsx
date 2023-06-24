// ComFavoriteCountries.jsx

import ComCountryCardSmall from './ComCountryCardSmall';

const ComFavoriteCountries = ({ favorites, onBack, setFavorites }) => {
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

  return (
    <div className='favorites-container'>
      <h1>Favorite Countries:</h1>
      {favorites.length > 0 ? (
        <div className='container'>
          {favorites.map((country) => (
            <ComCountryCardSmall
              key={country.id}
              country={country}
              favorites={favorites}
              handleFavoriteToggle={handleFavoriteToggle}
              onCountrySelect={() => {}}
            />
          ))}
        </div>
      ) : (
        <p>No favorite countries marked yet.</p>
      )}

      <button className='back-btn' onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default ComFavoriteCountries;
