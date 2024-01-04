/**
 * Filters an array of country objects based on a search value.
 * @param {Object[]} countries - An array of country objects.
 * @param {string} searchValue - The value to search for in country names.
 * @returns {Object[]} An array of filtered country objects.
 */
function UtilFilterCountries(countries, searchValue) {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  );
  return filteredCountries;
}

export default UtilFilterCountries;
