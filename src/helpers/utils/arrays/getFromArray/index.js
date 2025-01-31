/**
 * Get first n from data array
 * @param {array} array 
 * @param {object} arrayConfig = 
 * @param {number} startIndex = starting point 
 * @returns 
 */
const getDataFromArray = (array, arrayConfig, startIndex = 0) => {
    const { maxDisplayCount } = arrayConfig;

    // limit returned array data to no more than maxDisplayCount
    const endIndex = startIndex + maxDisplayCount;

    const paginatedData = array.slice(startIndex, endIndex);

    return paginatedData;
};

export default getDataFromArray;