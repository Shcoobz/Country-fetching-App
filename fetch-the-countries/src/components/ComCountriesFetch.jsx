import { useState, useEffect } from 'react';
import ComCountriesList from './ComCountriesList';

function ComCountriesFetch({ onCountrySelect, sortData }) {
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
  }, [sortData]);

  console.log('Data from ComCountries:', data);

  return (
    <div>
      <ComCountriesList data={data} onCountrySelect={onCountrySelect} />
    </div>
  );
}

export default ComCountriesFetch;
