/**
 * Get first n from data array
 * @param {*} apiResponse 
 * @param {*} paginationConfig 
 * @returns 
 * TODO: Bind the configuration in bus logic - instead of hard coded values
 */
const getDataFromArray = (array, arrayConfig ) => {
    const { maxDisplayCount} = arrayConfig;
    const paginatedData = array.slice(0, maxDisplayCount);

    return paginatedData;
};

export default getDataFromArray;