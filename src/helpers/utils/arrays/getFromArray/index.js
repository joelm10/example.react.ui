/**
 * Get first n from data array
 * @param {array} array 
 * @param {object} arrayConfig = 
 * @param {number} startIndex = starting point 
 * @returns 
 */
const getDataFromArray = (array = [], maxItems = 0, startIndex = 0) => {
    // limit returned array data to no more than maxDisplayCount
    const endIndex = startIndex + maxItems;

    const paginatedData = array.slice(startIndex, endIndex);

    return paginatedData;
};

export default getDataFromArray;