import ComCountriesFetch from './components/ComCountriesFetch';
import ComCountryCardBig from './components/ComCountryCardBig';
import ComFavoriteCountries from './components/ComFavoriteCountries';

import { useState } from 'react';
import './App.css';

// TODO: incorporate list into app and then figure out how to separate it
// TODO: when on details show fav doesnt work

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySortOrder, setCountrySortOrder] = useState('asc');
  const [sortingVisible, setSortingVisible] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const checkIfOnCountryDetails = isExpanded ? 'app-expanded' : 'app';

  function handleCountrySelect(country) {
    setSelectedCountry(country);
    setSortingVisible(false);
    setSearchValue('');
    setIsExpanded(true);
  }

  function handleCountrySort() {
    setCountrySortOrder((prevSortOrder) =>
      prevSortOrder === 'asc' ? 'desc' : 'asc'
    );
  }

  function handleBackBtn() {
    setSelectedCountry(null);
    setSortingVisible(true);
    setIsExpanded(false);
    setShowFavorites(false);
  }

  function handleFavoriteBtn() {
    setShowFavorites(true);
  }

  function sortData(data) {
    return [...data].sort((a, b) => {
      const nameA = a.name.common.toUpperCase();
      const nameB = b.name.common.toUpperCase();

      if (countrySortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else if (countrySortOrder === 'desc') {
        return nameB.localeCompare(nameA);
      }

      return 0;
    });
  }

  function renderSortBtn() {
    if (sortingVisible) {
      return (
        <button className='sort-btn' onClick={handleCountrySort}>
          Sort: {countrySortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      );
    }
    return null;
  }

  function renderFavoriteBtn() {
    if (!showFavorites) {
      return (
        <button className='favorites-btn' onClick={handleFavoriteBtn}>
          Show Favorite Countries
        </button>
      );
    }
    return null;
  }

  function renderCountriesContent() {
    if (selectedCountry && !showFavorites) {
      return (
        <ComCountryCardBig country={selectedCountry} onBack={handleBackBtn} />
      );
    }

    if (showFavorites) {
      return (
        <ComFavoriteCountries
          favorites={sortData(favorites)}
          onBack={handleBackBtn}
          onCountrySelect={handleCountrySelect}
          setFavorites={setFavorites}
        />
      );
    }

    return (
      <ComCountriesFetch
        onCountrySelect={handleCountrySelect}
        sortData={sortData}
        sortOrder={countrySortOrder}
        sortingVisible={sortingVisible}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    );
  }

  return (
    <div className={checkIfOnCountryDetails}>
      <div className='button-container'>
        {renderSortBtn()}
        {renderFavoriteBtn()}
      </div>
      {renderCountriesContent()}
    </div>
  );
}
export default App;
