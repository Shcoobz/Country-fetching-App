/**
 * Asynchronously fetches country data from a REST API.
 * @returns {Promise<Array>} A promise that resolves to an array of country data or an empty array on error.
 */
async function UtilFetchCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching countries:', err);
    return [];
  }
}

export default UtilFetchCountries;
