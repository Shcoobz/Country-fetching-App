import { useState } from 'react';
import './App.css';
import ComCountriesFetch from './components/ComCountriesFetch';
import ComCountryData from './components/ComCountryData';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySortOrder, setCountrySortOrder] = useState('asc');
  const [sortingVisible, setSortingVisible] = useState(true);

  function handleCountrySelect(country) {
    setSelectedCountry(country);
    setSortingVisible(false);
  }

  function handleBackBtn() {
    setSelectedCountry(null);
    setSortingVisible(true);
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

  function renderCountriesContent() {
    if (selectedCountry) {
      return (
        <ComCountryData country={selectedCountry} onBack={handleBackBtn} />
      );
    } else {
      return (
        <ComCountriesFetch
          onCountrySelect={handleCountrySelect}
          sortData={sortData}
          sortOrder={countrySortOrder}
          sortingVisible={sortingVisible}
        />
      );
    }
  }

  return (
    <>
      <div>
        <div className='button-container'>{renderSortBtn()}</div>
        {renderCountriesContent()}
      </div>
    </>
  );
}

export default App;
