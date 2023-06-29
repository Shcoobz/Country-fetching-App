import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import ComBtn from '../components/ComBtn';

function CardCountrySmall({
  country,
  favorites,
  handleAddRemoveFavToggle,
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
        <ComBtn
          onClick={() => handleAddRemoveFavToggle(country)}
          icon={isFavorite ? solidHeart : regularHeart}
          iconClassName={isFavorite ? 'solidHeart' : 'regularHeart'}
          className={`fav-btn ${isFavorite ? 'solidHeart' : 'regularHeart'}`}
          tooltip={true}
        />
      </div>
      <ComBtn
        text='Learn More'
        onClick={() => onCountrySelect(country)}
        className='learn-more-btn'
      />
    </div>
  );
}

export default CardCountrySmall;
