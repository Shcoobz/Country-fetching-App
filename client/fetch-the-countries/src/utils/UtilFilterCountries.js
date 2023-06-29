export function filterCountries(countries, searchValue) {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  );
  return filteredCountries;
}
