import getRouteList from '../../../../../helpers/navigation/routing/generators/getRouteList';
import App from '../../../../../App';
import ErrorComponent from '../../../../../components/Library/Errors';

const defaultRouteList = [
    { "element": <App pageTitle="App Home" />, "path": "", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="App Home" />, "path": "/", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="Home" />, "path": "/home", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="About Me" />, "path": "/about", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="Photography" />, "path": "/photography", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="engineering" />, "path": "/engineering", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="About Me" />, "path": "/about-me", "errorElement": <ErrorComponent /> },

];

describe('/helpers/navigation/routing/generators', () => {
    test('getRouteList() should flat map', () => {
        const recieved = getRouteList();
        expect(recieved).toEqual(defaultRouteList);
    });
});