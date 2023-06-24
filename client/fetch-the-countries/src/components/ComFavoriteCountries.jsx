import ComCountryCardSmall from './ComCountryCardSmall';
import ComBackBtn from './Buttons/ComBackBtn';

const ComFavoriteCountries = ({ favorites, onBack, setFavorites }) => {
  const favoritesWithStatus = getFavoritesWithStatus();
  const favoriteCountryCards = createFavoriteCountryCards(favoritesWithStatus);
  const favoriteCountriesContent = createFavoriteCountriesContent();

  function handleAddFavorite(country) {
    setFavorites((prevFavorites) => [...prevFavorites, country]);
  }

  function handleRemoveFavorite(country) {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.name.common !== country.name.common)
    );
  }

  function getFavoritesWithStatus() {
    return favorites.map((country) => {
      const isFavorite = favorites.some(
        (fav) => fav.name.common === country.name.common
      );

      return {
        ...country,
        isFavorite,
      };
    });
  }

  function createFavoriteCountryCards(favorites) {
    let cards = [];
    for (let i = 0; i < favorites.length; i++) {
      const { isFavorite, ...country } = favorites[i];
      cards.push(
        <ComCountryCardSmall
          key={country.id}
          country={country}
          favorites={favorites}
          handleFavoriteToggle={
            isFavorite ? handleRemoveFavorite : handleAddFavorite
          }
          onCountrySelect={() => {}}
        />
      );
    }
    return cards;
  }

  function createFavoriteCountriesContent() {
    if (favorites.length > 0) {
      return <div className='container'>{favoriteCountryCards}</div>;
    } else {
      return <p>No favorite countries marked yet.</p>;
    }
  }

  return (
    <div className='favorites-container'>
      <h1>Favorite Countries:</h1>
      {favoriteCountriesContent}
      <ComBackBtn onClick={onBack} />
    </div>
  );
};

export default ComFavoriteCountries;
