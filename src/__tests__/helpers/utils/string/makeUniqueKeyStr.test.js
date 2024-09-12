// makeUniqueKeyStr()
import makeUniqueKeyStr from "../../../../helpers/utils/string/makeUniqueKeyStr";
describe('helpers/utils/string/', () => {
    test('makeUniqueKeyStr, should return empty string if no vaue passed', () => {
        const received = makeUniqueKeyStr();
        expect(received).toBe('');
    });
    test('makeUniqueKeyStr, should return hyphenated string if passed', () => {
        const received = makeUniqueKeyStr('i am a string with spaces');
        const expected = 'i-am-a-string-with-spaces';

        expect(received).toEqual(expected);
    });
});