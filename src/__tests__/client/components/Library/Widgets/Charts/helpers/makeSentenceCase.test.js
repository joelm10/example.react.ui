// const { makeSentenceCase } = require("client/components/Library/Widgets/Charts/helpers/makeSentenceCase");
import { makeSentenceCase } from "client/components/Library/Widgets/Charts/helpers/makeSentenceCase";

describe('Library/Widgets/Charts/helpers/', () => {

    test('makeSentenceCase(), should retnurn null if no string passed', () => {
        const recieved = makeSentenceCase();

        expect(recieved).toBe('');
    });

    test('makeSentenceCase(), should return sentence case if string passed', () => {
        const recieved = makeSentenceCase('I am Long Sentence');
        const expected = 'I am Long Sentence';
        expect(recieved).toBe(expected);
    });
});