/**
 * Sorts an array of data based on a specified sort order.
 * @param {Array} data - The array of data to be sorted.
 * @param {string} sortOrder - The sort order ('asc' for ascending, 'desc' for descending).
 * @returns {Array} The sorted array of data.
 */
function UtilSortData(data, sortOrder) {
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

export default UtilSortData;
