import CardCountrySmall from './CardCountrySmall';
import { filterCountries } from '../utils/UtilFilterCountries';

function CardFavoritePage({
  favorites,
  favoriteSearchValue,
  handleAddRemoveFavToggle,
  onCountrySelect,
}) {
  function updateCountryObjectsWithFavorites() {
    return favorites.map((country, index) => {
      const isFavorite = favorites.some(
        (fav) => fav.name.common === country.name.common
      );

      const id = country.id || index;

      return { ...country, isFavorite, id };
    });
  }

  function renderFavoriteCountryCards() {
    const updatedFavorites = updateCountryObjectsWithFavorites();
    const filteredFavorites = filterCountries(
      updatedFavorites,
      favoriteSearchValue
    );

    return filteredFavorites.map((country) => (
      <CardCountrySmall
        key={country.name.common}
        country={country}
        favorites={updatedFavorites}
        handleAddRemoveFavToggle={handleAddRemoveFavToggle}
        onCountrySelect={() => onCountrySelect(country)}
      />
    ));
  }

  return <>{renderFavoriteCountryCards()}</>;
}

export default CardFavoritePage;
