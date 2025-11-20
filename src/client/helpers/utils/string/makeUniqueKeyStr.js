/**
 * Simple string generator
 * @param {string} str
 * @returns string in hyphen case
 */
const makeUniqueKeyStr = (str) => {
    if (!str) {
        return '';
    }
    const uniqueStr = str.replace(/ /g, '-')
        .replace(/,/, '');

    return uniqueStr;
};

export default makeUniqueKeyStr;
