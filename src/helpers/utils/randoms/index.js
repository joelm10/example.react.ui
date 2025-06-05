/**
 * Generates a random number between the specified minimum and maximum values.
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random integer between min and max.
 */
const getRandomNumbers = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

/**
 * Generates an array of random numbers with specified length and range.
 * @param {number} arrLen - The length of the array to generate.
 * @param {number} min - The minimum possible value (inclusive).
 * @param {number} max - The maximum possible value (inclusive).
 * @returns {Array<number>} Array of random numbers.
 */
// getRandomByLength function
const getRandomByLength = (arrLen, min, max) => {
    return Array.from({ length: arrLen }, () => getRandomNumbers(min, max));
};

export { getRandomNumbers, getRandomByLength };