import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

function ComCountryCardSmall({
  country,
  favorites,
  handleFavoriteToggle,
  onCountrySelect,
}) {
  const isFavorite = favorites.some(
    (fav) => fav.name.common === country.name.common
  );

  return (
    <div className='country'>
      <div className='country-name-container'>
        <h2 className='country-name'>{country.name.common}</h2>

        <button
          className={`fav-btn ${isFavorite ? 'favorite' : ''}`}
          onClick={() => handleFavoriteToggle(country)}>
          <FontAwesomeIcon
            icon={isFavorite ? solidHeart : regularHeart}
            className={`heart-icon ${
              isFavorite ? 'solidHeart' : 'regularHeart'
            }`}
          />
          <div className='tooltip'></div>
        </button>
      </div>
      <button
        className='learn-more-btn'
        onClick={() => onCountrySelect(country)}>
        Learn More
      </button>
    </div>
  );
}

export default ComCountryCardSmall;
