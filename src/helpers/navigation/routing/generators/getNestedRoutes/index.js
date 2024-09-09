/**
 * getNestedRoutes
 * @param {array} array 
 * @param {key} key 
 * @returns flat array
 */
const getNestedRoutes = (array = [], key = '') => {
    const nestedRoutes = array.length
        ? array?.flatMap((item) => {
            return item[key];
        })
        : []
    return nestedRoutes;
};

export default getNestedRoutes;