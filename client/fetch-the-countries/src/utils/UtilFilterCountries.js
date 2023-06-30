function UtilFilterCountries(countries, searchValue) {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  );
  return filteredCountries;
}

export default UtilFilterCountries;
