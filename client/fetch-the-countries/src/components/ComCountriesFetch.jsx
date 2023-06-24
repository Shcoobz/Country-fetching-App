import { useState, useEffect } from 'react';
import ComCountriesList from './ComCountriesList';

function ComCountriesFetch({
  onCountrySelect,
  sortData,
  sortOrder,
  searchValue,
  setSearchValue,
  favorites,
  setFavorites,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const sortedData = sortData(data);
        setData(sortedData);
      } catch (err) {
        console.log('useEffect in ComCountries:', err);
      }
    };

    fetchData();
  }, [sortData, sortOrder]);

  console.log('Data from ComCountries:', data);

  const filteredData = data.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <ComCountriesList
        data={filteredData}
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
