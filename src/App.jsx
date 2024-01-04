import { useState, useEffect } from 'react';
import './App.css';

import ContCountryPage from './content/ContCountryPage';
import ContCountryDetailsPage from './content/ContCountryDetailsPage';
import ContFavoritesPage from './content/ContFavoritesPage';

import UtilFilterCountries from './utils/UtilFilterCountries';
import UtilFetchCountries from './utils/UtilFetchCountries';
import UtilSortData from './utils/UtilSortData';

/**
 * Main application component.
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
  // State variables
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySortOrder, setCountrySortOrder] = useState('asc');
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [countries, setCountries] = useState([]);
  const [favoriteSearchValue, setFavoriteSearchValue] = useState('');

  const checkIfOnCountryDetails = isExpanded ? 'app-expanded' : 'app';

  /**
   * Fetches and sorts countries based on the selected sorting order.
   */
  useEffect(() => {
    async function getCountries() {
      const fetchedCountries = await UtilFetchCountries();
      const sortedCountries = UtilSortData(fetchedCountries, countrySortOrder);
      setCountries(sortedCountries);
    }

    getCountries();
  }, [countrySortOrder]);

  /**
   * Sorts the list of favorite countries based on the selected sorting order.
   */
  useEffect(() => {
    setFavorites((prevFavorites) => UtilSortData(prevFavorites, countrySortOrder));
  }, [countrySortOrder]);

  /**
   * Event handler for selecting a country.
   * @param {Object} country - The selected country object.
   */
  function onCountrySelect(country) {
    setSelectedCountry(country);
    setSearchValue('');
    setIsExpanded(true);
    setShowFavorites(false);
  }

  /**
   * Event handler for toggling the sorting order of countries.
   */
  function onCountrySort() {
    setCountrySortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  }

  /**
   * Event handler for clicking the back button.
   * Resets the application state to its initial state.
   */
  function onBackBtnClick() {
    setSelectedCountry(null);
    setIsExpanded(false);
    setShowFavorites(false);
    setFavoriteSearchValue('');
    setSearchValue('');
    setCountrySortOrder('asc');
  }

  /**
   * Event handler for clicking the "Favorites" button.
   * Displays the favorites page and resets the sorting order.
   */
  function onFavoritesBtnClick() {
    setShowFavorites(true);
    setIsExpanded(false);
    setCountrySortOrder('asc');
  }

  /**
   * Event handler for adding a country to favorites.
   * @param {Object} country - The country to be added to favorites.
   */
  function onAddFavClick(country) {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, country];
      return UtilSortData(newFavorites);
    });

    setFavoriteSearchValue('');
  }

  /**
   * Event handler for removing a country from favorites.
   * @param {Object} country - The country to be removed from favorites.
   */
  function onRemoveFavClick(country) {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (fav) => fav.name.common !== country.name.common
      );

      return UtilSortData(updatedFavorites);
    });
  }

  /**
   * Event handler for input in the favorites search bar.
   * @param {Event} e - The input change event.
   */
  function onFavoritesSearchInput(e) {
    setFavoriteSearchValue(e.target.value);
  }

  /**
   * Event handler for removing all countries from favorites.
   */
  function onRemoveAllFavorites() {
    setFavorites([]);
  }

  /**
   * Event handler for toggling the favorite status of a country.
   * If the country is a favorite, it will be removed, otherwise added.
   * @param {Object} country - The country to toggle as a favorite.
   */
  function handleAddRemoveFavToggle(country) {
    if (favorites.some((fav) => fav.name.common === country.name.common)) {
      onRemoveFavClick(country);
    } else {
      onAddFavClick(country);
    }
  }

  /**
   * Renders the appropriate page based on the current state and user interactions.
   * @returns {JSX.Element} The rendered page component.
   */
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
          favorites={favorites}
          handleAddRemoveFavToggle={handleAddRemoveFavToggle}
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
        filterCountries={UtilFilterCountries}
      />
    );
  }

  return <div className={checkIfOnCountryDetails}>{renderCountriesPage()}</div>;
}

export default App;
