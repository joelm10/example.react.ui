/**
 * Helper function to sort an array of objects by a specific property
 * @param {Array} objects - Array of objects to sort
 * @param {string} orderProperty - Property name to sort by
 * @returns {Array} Sorted array of objects
 */
export const sortObjectsByOrder = (objects, orderProperty) => {
    return [...objects].sort((a, b) => a[orderProperty] - b[orderProperty]);
};
