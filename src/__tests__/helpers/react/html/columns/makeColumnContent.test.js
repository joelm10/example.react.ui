// makeColumnContent
import makeColumnContent from '../../../../../helpers/react/html/columns/content';

const testProps = {
    content: [],
    styles: {}
};
describe('helpers/generators/html/columns', () => {
    test('makeColumnContent() should return null if empty array passed', () => {
        const recieved = makeColumnContent(testProps);
        expect(recieved).toBeNull();
    });

});
