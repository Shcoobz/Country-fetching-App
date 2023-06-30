import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';

import CardCountryBig from '../cards/CardCountryBig';

function ContCountryDetailsPage({
  onFavoritesBtnClick,
  onBackBtnClick,
  selectedCountry,
}) {
  return (
    <div>
      <ComTitle text='Details:' />
      <div className='btn-container'>
        <ComBtn
          text='Show Favorite Countries'
          onClick={onFavoritesBtnClick}
          className='favorites-btn'
        />

        <ComBtn text='Back' onClick={onBackBtnClick} className='back-btn' />
      </div>
      <div>
        <CardCountryBig country={selectedCountry} onBack={onBackBtnClick} />
      </div>
    </div>
  );
}

export default ContCountryDetailsPage;
