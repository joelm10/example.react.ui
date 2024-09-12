import getRouteList from '../../../../../helpers/navigation/routing/generators/getRouteList';
import App from '../../../../../App';
import ErrorComponent from '../../../../../components/Library/Errors';

const defaultRouteList = [
    { "element": <ErrorComponent />, "path": "" },
    { "element": <ErrorComponent />, "path": "/" },
    { "element": <App pageTitle="Home" />, "path": "/home" },
    { "element": <App pageTitle="About Me" />, "path": "/about" },
    // { "element": <App />, "path": "http://photography.com" },
    { "element": <App pageTitle="Photography" />, "path": "/photography" },
    { "element": <App pageTitle="engineering" />, "path": "/engineering" },
    { "element": <App pageTitle="About Me"/>, "path": "/about-me" },

];

describe('/helpers/navigation/routing/generators', () => {
    test('getRouteList() should flat map', () => {
        const recieved = getRouteList();
        expect(recieved).toEqual(defaultRouteList);
    });
});