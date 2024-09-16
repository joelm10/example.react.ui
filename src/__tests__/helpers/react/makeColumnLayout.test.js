
import makeColumnLayout from '../../../helpers/react/html/columns';

const testProps = {
    content: [],
    styles: {}
};
describe('helpers/generators/html/columns', () => {
    test('makeColumnContent() should return null if empty array passed', () => {
        const recieved = makeColumnLayout(testProps);
        expect(recieved).toBeNull();
    });

});
