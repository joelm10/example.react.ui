import getRouteList from 'helpers/navigation/routing/generators/getRouteList';
import App from 'App';
import ErrorComponent from 'components/Library/Atomic/Errors';

const defaultRouteList = [{ "element": <App pageTitle="App Home" />, "errorElement": <ErrorComponent />, "path": "" },
{ "element": <App pageTitle="App Home" />, "errorElement": <ErrorComponent />, "path": "/" },
{ "element": <App pageTitle="Home" />, "errorElement": <ErrorComponent />, "path": "/home" },
{ "element": <App pageTitle="About Me" />, "errorElement": <ErrorComponent />, "path": "/about" },
{ "element": <App pageTitle="Photography" />, "errorElement": <ErrorComponent />, "path": "/photography" },
{ "element": <App pageTitle="engineering" />, "errorElement": <ErrorComponent />, "path": "/engineering" },
{ "element": <App pageTitle="game things" />, "errorElement": <ErrorComponent />, "path": "/game" },
{ "element": <App pageTitle="chartJS wrapper" />, "errorElement": <ErrorComponent />, "path": "/chart" },
{ "element": <App pageTitle="kanban board" />, "errorElement": <ErrorComponent />, "path": "/kanban" },
{ "element": <App pageTitle="About Me" />, "errorElement": <ErrorComponent />, "path": "/about-me" },
{ "element": <App pageTitle="bar" />, "errorElement": <ErrorComponent />, "path": "/chart/bar" },
{ "element": <App pageTitle="bubble" />, "errorElement": <ErrorComponent />, "path": "/chart/bubble" },
{ "element": <App pageTitle="donut" />, "errorElement": <ErrorComponent />, "path": "/chart/donut" },
{ "element": <App pageTitle="line" />, "errorElement": <ErrorComponent />, "path": "/chart/line" },
{ "element": <App pageTitle="pie" />, "errorElement": <ErrorComponent />, "path": "/chart/pie" },
{ "element": <App pageTitle="polarArea" />, "errorElement": <ErrorComponent />, "path": "/chart/polarArea" },
{ "element": <App pageTitle="radar" />, "errorElement": <ErrorComponent />, "path": "/chart/radar" },
{ "element": <App pageTitle="scatter" />, "errorElement": <ErrorComponent />, "path": "/chart/scatter" }]


describe('/helpers/navigation/routing/generators', () => {
    test('getRouteList() should flat map', () => {
        // Call the function to get the route list
        const received = getRouteList();
        // Check if the received route list matches the default route list
        expect(received).toEqual(expect.arrayContaining(defaultRouteList));
        // expect(received).toEqual(defaultRouteList);
    });
});
