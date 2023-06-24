import { useState } from 'react';
import './App.css';
import ComCountriesFetch from './components/ComCountriesFetch';
import ComCountryCardBig from './components/ComCountryCardBig';
import ComFavoriteCountries from './components/ComFavoriteCountries';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySortOrder, setCountrySortOrder] = useState('asc');
  const [sortingVisible, setSortingVisible] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  function handleCountrySelect(country) {
    setSelectedCountry(country);
    setSortingVisible(false);
    setSearchValue('');
    setIsExpanded(true);
  }

  function handleBackBtn() {
    setSelectedCountry(null);
    setSortingVisible(true);
    setIsExpanded(false);
    setShowFavorites(false);
  }

  function handleCountrySort() {
    setCountrySortOrder((prevSortOrder) =>
      prevSortOrder === 'asc' ? 'desc' : 'asc'
    );
  }

  function sortData(data) {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
      const nameA = a.name.common.toUpperCase();
      const nameB = b.name.common.toUpperCase();

      if (countrySortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else if (countrySortOrder === 'desc') {
        return nameB.localeCompare(nameA);
      }

      return 0;
    });

    return sortedData;
  }

  function sortFavorites() {
    const sortedFavorites = favorites.slice();
    sortedFavorites.sort((a, b) => {
      const nameA = a.name.common.toUpperCase();
      const nameB = b.name.common.toUpperCase();

      if (countrySortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else if (countrySortOrder === 'desc') {
        return nameB.localeCompare(nameA);
      }

      return 0;
    });

    return sortedFavorites;
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
    return null; // Add this line to handle the case where showFavorites is true
  }

  function renderCountriesContent() {
    if (selectedCountry) {
      return (
        <ComCountryCardBig country={selectedCountry} onBack={handleBackBtn} />
      );
    }

    if (showFavorites) {
      const sortedFavorites = sortFavorites();
      return (
        <ComFavoriteCountries
          favorites={sortedFavorites}
          onBack={handleBackBtn}
          setFavorites={setFavorites} // Add this line to pass setFavorites to ComFavoriteCountries
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

  function handleFavoriteBtn() {
    setShowFavorites(true);
  }

  const checkIfOnCountryDetails = isExpanded ? 'app-expanded' : 'app';

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
