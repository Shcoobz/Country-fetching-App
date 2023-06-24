import ComLearnMoreBtn from './Buttons/ComLearnMoreBtn';
import ComFavBtn from './Buttons/ComFavBtn';

function ComCountryCardSmall({
  country,
  favorites,
  handleFavoriteToggle,
  onCountrySelect,
}) {
  const isFavorite = checkIfFavorite();

  function checkIfFavorite() {
    return favorites.some((fav) => fav.name.common === country.name.common);
  }

  return (
    <div className='country'>
      <div className='country-name-container'>
        <h2 className='country-name'>{country.name.common}</h2>
        <ComFavBtn
          isFavorite={isFavorite}
          handleFavoriteToggle={handleFavoriteToggle}
          country={country}
        />
      </div>
      <ComLearnMoreBtn onClick={onCountrySelect} country={country} />
    </div>
  );
}

export default ComCountryCardSmall;
