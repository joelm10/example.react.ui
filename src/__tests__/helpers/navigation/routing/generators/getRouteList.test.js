import getRouteList from 'helpers/navigation/routing/generators/getRouteList';
import App from 'App';
import ErrorComponent from 'components/Library/Atomic/Errors';

const defaultRouteList = [
    { "element": <App pageTitle="App Home" />, "path": "", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="App Home" />, "path": "/", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="Home" />, "path": "/home", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="About Me" />, "path": "/about", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="Photography" />, "path": "/photography", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="engineering" />, "path": "/engineering", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="game things" />, "path": "/game", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="chartJS wrapper" />, "path": "/chart", "errorElement": <ErrorComponent /> },
    { "element": <App pageTitle="About Me" />, "path": "/about-me", "errorElement": <ErrorComponent /> },
    {
        "element": <App
            pageTitle="bar"
        />,
        "errorElement": <ErrorComponent />,
        "path": "/chart/bar",
    },
    {
        "element": <App
            pageTitle="bubble"
        />,
        "errorElement": <ErrorComponent />,
        "path": "/chart/bubble",
    },
    {
        "element": <App
            pageTitle="donut"
        />,
        "errorElement": <ErrorComponent />,
        "path": "/chart/donut",
    },
    {
        "element": <App
            pageTitle="line"
        />,
        "errorElement": <ErrorComponent />,
        "path": "/chart/line",
    },
    {
        "element": <App
            pageTitle="pie"
        />,
        "errorElement": <ErrorComponent />,
        "path": "/chart/pie",
    },
    {
        "element": <App
            pageTitle="polarArea"
        />,
        "errorElement": <ErrorComponent />,
        "path": "/chart/polarArea",
    },
    {
        "element": <App
            pageTitle="radar"
        />,
        "errorElement": <ErrorComponent />,
        "path": "/chart/radar",
    },
    {
        "element": <App
            pageTitle="scatter"
        />,
        "errorElement": <ErrorComponent />,
        "path": "/chart/scatter",
    },
];

describe('/helpers/navigation/routing/generators', () => {
    test('getRouteList() should flat map', () => {
        const recieved = getRouteList();
        expect(recieved).toEqual(defaultRouteList);
    });
});