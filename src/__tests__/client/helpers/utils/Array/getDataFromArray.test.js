import getDataFromArray from "client/helpers/utils/arrays/getFromArray";

/**
 * 
 * Method arguments
 * array = [], maxItems = 0, startIndex = 0
 */

describe('helpers/utils/array', () => {
    test('->getDataFromArray() should return empty array if none provided', () => {
        const recieved = getDataFromArray();
        expect(recieved.length).toBe(0);
    });
    test('->getDataFromArray() should get an array with volume requested when passed', () => {
        const recieved = getDataFromArray([0, 1, 2, 3, 4, 5, 6, 7, 8], 1, 3);
        expect(recieved).toEqual([3]);
    });
    test('->getDataFromArray() should get an array with items with same length requested when passed', () => {
        const recieved = getDataFromArray([0, 1, 2, 3, 4, 5, 6, 7, 8], 4, 3);
        expect(recieved).toEqual([3, 4, 5, 6]);
    });
});