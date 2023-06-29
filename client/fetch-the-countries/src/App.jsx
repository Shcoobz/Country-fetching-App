import { useState, useEffect } from 'react';
import './App.css';

import CardCountryBig from './cards/CardCountryBig';
import CardCountrySmall from './cards/CardCountrySmall';

import ComBtn from './components/ComBtn';
import ComTitle from './components/ComTitle';
import ComSearch from './components/ComSearch';

// TODO: refactor: split into components
// TODO: change spacing on fav page && details page // title & btn
// TODO: make favorite country cards into component
// TODO: rethink function header naming
// TODO: make btns unactive

async function fetchCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching countries:', err);
    return [];
  }
}

// TODO: move to /utils
function filterCountries(countries, searchValue) {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  );
  return filteredCountries;
}

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySortOrder, setCountrySortOrder] = useState('asc');
  const [sortingVisible, setSortingVisible] = useState(true);
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
      const fetchedCountries = await fetchCountries();
      const sortedCountries = sortData(fetchedCountries, countrySortOrder);
      setCountries(sortedCountries);
    }

    getCountries();
  }, [countrySortOrder]);

  // sorts favorites
  useEffect(() => {
    setFavorites((prevFavorites) => sortData(prevFavorites, countrySortOrder));
  }, [countrySortOrder]);

  // sort data
  function sortData(data, sortOrder) {
    return [...data].sort((a, b) => {
      const nameA = a.name.common.toUpperCase();
      const nameB = b.name.common.toUpperCase();

      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else if (sortOrder === 'desc') {
        return nameB.localeCompare(nameA);
      }

      return 0;
    });
  }

  // handle btn clicks & inputs
  function onCountrySelect(country) {
    setSelectedCountry(country);
    setSortingVisible(false);
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
    setSortingVisible(true);
    setIsExpanded(false);
    setShowFavorites(false);
    setFavoriteSearchValue('');
    setCountrySortOrder('asc');
  }

  function onFavoritesBtnClick() {
    setShowFavorites(true);
    setIsExpanded(false);
    setSortingVisible(true);
    setCountrySortOrder('asc');
  }

  function onAddFavClick(country) {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, country];
      return sortData(newFavorites);
    });
  }

  function onRemoveFavClick(country) {
    console.log(`Removing country: ${country.name.common}`);
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (fav) => fav.name.common !== country.name.common
      );
      // TODO: remove
      console.log(
        `Updated favorites: ${updatedFavorites.map((fav) => fav.name.common)}`
      );
      return sortData(updatedFavorites);
    });
  }

  function onFavoritesSearchInput(e) {
    setFavoriteSearchValue(e.target.value);
  }

  // TODO: separate all content into own files
  // countries
  // CardCountrySmall - main page
  function renderCountryPageContent() {
    const filteredCountries = filterCountries(countries, searchValue);

    return (
      <div>
        <ComTitle text='Countries:' />
        <div>
          <ComSearch
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='I like to search it, search it... countries!'
          />
        </div>
        <div className='btn-container'>
          <ComBtn
            text={`Sort: ${
              countrySortOrder === 'asc' ? 'Ascending' : 'Descending'
            }`}
            onClick={onCountrySort}
            className='sort-btn'
            iconClassName=''
            icon={null}
            tooltip={false}
          />

          <ComBtn
            text='Show Favorite Countries'
            onClick={onFavoritesBtnClick}
            className='favorites-btn'
          />
        </div>
        <div className='container country-grid'>
          {/* dynamically render the CardCountrySmall component for each country in the countries array with map */}
          {filteredCountries.map((country) => (
            <CardCountrySmall
              key={country.name.common}
              country={country}
              favorites={favorites}
              handleFavoriteToggle={handleAddRemoveFavToggle}
              onCountrySelect={() => onCountrySelect(country)}
            />
          ))}
        </div>
      </div>
    );
  }

  // CardCountryBig - details
  function renderCountryDetailsPageContent() {
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

  // favorites

  // TODO: make this a CardFavorites
  // CardCountryFavorite
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
        handleAddFavorite={onAddFavClick}
        handleRemoveFavorite={onRemoveFavClick}
        onCountrySelect={() => onCountrySelect(country)}
      />
    ));
  }

  // TODO: follow this & check where the buttons are added => find the last station & add the btns there
  function renderFavoritePageContent() {
    return (
      <div>
        <ComTitle text='Favorite Countries:' />
        <div>
          <ComSearch
            value={favoriteSearchValue}
            onChange={onFavoritesSearchInput}
            placeholder='I like to search it, search it ... even more ... favorites!'
          />
        </div>
        <div className='btn-container'>
          <ComBtn
            text={`Sort: ${
              countrySortOrder === 'asc' ? 'Ascending' : 'Descending'
            }`}
            onClick={onCountrySort}
            className='sort-btn'
            iconClassName=''
            icon={null}
            tooltip={false}
          />
          <ComBtn text='Back' onClick={onBackBtnClick} className='back-btn' />
        </div>
        <div>{renderFavoriteCountriesContent()}</div>
      </div>
    );
  }

  function updateCountryObjectsWithFavorites() {
    return favorites.map((country, index) => {
      const isFavorite = favorites.some(
        (fav) => fav.name.common === country.name.common
      );

      const id = country.id || index;

      return { ...country, isFavorite, id };
    });
  }

  // TODO: find better name
  // check if there are favorites in array or not and renders accordingly
  function renderFavoriteCountriesContent() {
    if (favorites.length > 0) {
      return (
        <div>
          <div className='container favorites-view'>
            {renderFavoriteCountryCards()}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>Nothing here, mate.</p>
        </div>
      );
    }
  }

  // rest
  function handleAddRemoveFavToggle(country) {
    if (favorites.some((fav) => fav.name.common === country.name.common)) {
      onRemoveFavClick(country);
    } else {
      onAddFavClick(country);
    }
  }

  // final rendering
  // TODO: find better name
  // checks if favorites exist, if yes: shows them
  function renderFavoritesContent() {
    if (!showFavorites) {
      return null;
    }

    return renderFavoritePageContent();
  }

  // TODO: find better name
  function renderCountriesPage() {
    const favoritesContent = renderFavoritesContent();

    if (favoritesContent) {
      return favoritesContent;
    }

    if (selectedCountry) {
      return renderCountryDetailsPageContent();
    }

    return renderCountryPageContent();
  }

  return <div className={checkIfOnCountryDetails}>{renderCountriesPage()}</div>;
}

export default App;
