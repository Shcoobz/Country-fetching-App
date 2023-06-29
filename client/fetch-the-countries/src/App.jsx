import { useState, useEffect } from 'react';
import './App.css';

import ContCountryPage from './content/ContCountryPage';
import ContCountryDetailsPage from './content/ContCountryDetailsPage';
import ContFavoritesPage from './content/ContFavoritesPage';

import { filterCountries } from './utils/UtilFilterCountries';
import UtilFetchCountries from './utils/UtilFetchCountries';
import UtilSortData from './utils/UtilSortData';

// TODO: change spacing on fav page && details page // title & btn
// TODO: fix flagg width in some country details
// TODO: when no favs in array, btn should not be visible in country page & favorite page

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySortOrder, setCountrySortOrder] = useState('asc');
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [countries, setCountries] = useState([]);
  const [favoriteSearchValue, setFavoriteSearchValue] = useState('');

  const checkIfOnCountryDetails = isExpanded ? 'app-expanded' : 'app';

  // fetches and sorts countries
  useEffect(() => {
    async function getCountries() {
      const fetchedCountries = await UtilFetchCountries();
      const sortedCountries = UtilSortData(fetchedCountries, countrySortOrder);
      setCountries(sortedCountries);
    }

    getCountries();
  }, [countrySortOrder]);

  // sorts favorites
  useEffect(() => {
    setFavorites((prevFavorites) =>
      UtilSortData(prevFavorites, countrySortOrder)
    );
  }, [countrySortOrder]);

  // handling events
  function onCountrySelect(country) {
    setSelectedCountry(country);
    setSearchValue('');
    setIsExpanded(true);
    setShowFavorites(false);
  }

  function onCountrySort() {
    setCountrySortOrder((prevSortOrder) =>
      prevSortOrder === 'asc' ? 'desc' : 'asc'
    );
  }

  function onBackBtnClick() {
    setSelectedCountry(null);
    setIsExpanded(false);
    setShowFavorites(false);
    setFavoriteSearchValue('');
    setCountrySortOrder('asc');
  }

  function onFavoritesBtnClick() {
    setShowFavorites(true);
    setIsExpanded(false);
    setCountrySortOrder('asc');
  }

  function onAddFavClick(country) {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, country];
      return UtilSortData(newFavorites);
    });
  }

  function onRemoveFavClick(country) {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (fav) => fav.name.common !== country.name.common
      );

      return UtilSortData(updatedFavorites);
    });
  }

  function onFavoritesSearchInput(e) {
    setFavoriteSearchValue(e.target.value);
  }

  function onRemoveAllFavorites() {
    setFavorites([]);
  }

  // toggle
  function handleAddRemoveFavToggle(country) {
    if (favorites.some((fav) => fav.name.common === country.name.common)) {
      onRemoveFavClick(country);
    } else {
      onAddFavClick(country);
    }
  }

  // rendering
  function renderCountriesPage() {
    if (showFavorites) {
      return (
        <ContFavoritesPage
          countrySortOrder={countrySortOrder}
          onCountrySort={onCountrySort}
          onBackBtnClick={onBackBtnClick}
          favoriteSearchValue={favoriteSearchValue}
          onFavoritesSearchInput={onFavoritesSearchInput}
          handleAddRemoveFavToggle={handleAddRemoveFavToggle}
          onRemoveAllFavorites={onRemoveAllFavorites}
          favorites={favorites}
          onCountrySelect={onCountrySelect}
        />
      );
    }

    if (selectedCountry) {
      return (
        <ContCountryDetailsPage
          onFavoritesBtnClick={onFavoritesBtnClick}
          onBackBtnClick={onBackBtnClick}
          selectedCountry={selectedCountry}
        />
      );
    }

    return (
      <ContCountryPage
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        countrySortOrder={countrySortOrder}
        onCountrySort={onCountrySort}
        onFavoritesBtnClick={onFavoritesBtnClick}
        countries={countries}
        favorites={favorites}
        handleAddRemoveFavToggle={handleAddRemoveFavToggle}
        onRemoveAllFavorites={onRemoveAllFavorites}
        onCountrySelect={onCountrySelect}
        filterCountries={filterCountries}
      />
    );
  }

  return <div className={checkIfOnCountryDetails}>{renderCountriesPage()}</div>;
}

export default App;
