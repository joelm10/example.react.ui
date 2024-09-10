import getRouteList from '../../../../../helpers/navigation/routing/generators/getRouteList';
import App from '../../../../../App';

const defaultRouteList = [
    { "element": <App />, "path": "/home" },
    { "element": <App />, "path": "/about" },
    { "element": <App />, "path": "http://photography.com" },
    { "element": <App />, "path": "/photography" },
    { "element": <App />, "path": "/engineering" },
    { "element": <App />, "path": "/about" }
];

describe('/helpers/navigation/routing/generators', () => {
    test('getRouteList() should flat map', () => {
        const recieved = getRouteList();
        expect(recieved).toEqual(defaultRouteList);
    });
});