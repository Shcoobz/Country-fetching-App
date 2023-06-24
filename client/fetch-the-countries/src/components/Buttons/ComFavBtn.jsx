import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const ComFavBtn = ({ isFavorite, handleFavoriteToggle, country }) => {
  return (
    <button
      className={`fav-btn ${isFavorite ? 'favorite' : ''}`}
      onClick={() => handleFavoriteToggle(country)}>
      <FontAwesomeIcon
        icon={isFavorite ? solidHeart : regularHeart}
        className={`heart-icon ${isFavorite ? 'solidHeart' : 'regularHeart'}`}
      />
      <div className='tooltip'></div>
    </button>
  );
};

export default ComFavBtn;
