import { useState, useEffect } from 'react';
import ComCountriesList from './ComCountriesList';

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

function sortCountries(countries, sortData) {
  const sortedCountries = sortData(countries);
  return sortedCountries;
}

function filterCountries(countries, searchValue) {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  );
  return filteredCountries;
}

function ComCountriesFetch({
  onCountrySelect,
  sortData,
  sortOrder,
  searchValue,
  setSearchValue,
  favorites,
  setFavorites,
}) {
  const [countries, setCountries] = useState([]);
  const filteredCountries = filterCountries(countries, searchValue);

  useEffect(() => {
    async function getCountries() {
      const fetchedCountries = await fetchCountries();
      const sortedCountries = sortCountries(fetchedCountries, sortData);
      setCountries(sortedCountries);
    }

    getCountries();
  }, [sortData, sortOrder]);

  console.log('Data from ComCountries:', countries);

  return (
    <div>
      <ComCountriesList
        data={filteredCountries}
        onCountrySelect={onCountrySelect}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    </div>
  );
}

export default ComCountriesFetch;
