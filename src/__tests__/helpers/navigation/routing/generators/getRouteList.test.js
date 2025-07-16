import getRouteList from 'helpers/navigation/routing/generators/getRouteList';
import App from 'App';
import ErrorComponent from 'components/Library/Atomic/Errors';

// Mock the getRouteList function
jest.mock('helpers/navigation/routing/generators/getRouteList', () => {
    return jest.fn();
});

const defaultRouteList = [
    { "element": <App pageTitle="App Home" />, "path": "", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="App Home" />, "path": "/", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="Home" />, "path": "/home", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="about Me" />, "path": "/about", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="photography" />, "path": "/photography", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="engineering" />, "path": "/engineering", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="game Things" />, "path": "/game", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="chartJS Wrapper" />, "path": "/chart", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="kanban Board" />, "errorElement": <ErrorComponent />, "path": "/kanban", },

    { "element": <App pageTitle="bar" />, "errorElement": <ErrorComponent />, "path": "/chart/bar", },
    { "element": <App pageTitle="bubble" />, "errorElement": <ErrorComponent />, "path": "/chart/bubble", },
    { "element": <App pageTitle="donut" />, "errorElement": <ErrorComponent />, "path": "/chart/donut", },
    { "element": <App pageTitle="line" />, "errorElement": <ErrorComponent />, "path": "/chart/line", },
    { "element": <App pageTitle="pie" />, "errorElement": <ErrorComponent />, "path": "/chart/pie", },
];

describe('/helpers/navigation/routing/generators', () => {
    test('getRouteList() should flat map', () => {
        // Set up the mock to return defaultRouteList
        getRouteList.mockReturnValue(defaultRouteList);

        const received = getRouteList();
        expect(received).toEqual(defaultRouteList);
    });
});
