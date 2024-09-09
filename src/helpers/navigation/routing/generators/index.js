import App from './../../../../App';
// routing within app
import navElements from '../../../../config/nav';
import footerElements from '../../../../config/footer';

const getNestedRoutes = (array, key) => {
    const nestedRoutes = array.flatMap((item) => {
        return item[key];
    });
    return nestedRoutes;
};

// extract only internal routes to be supported 
const getRouteList = () => {
    const footerRoutes = getNestedRoutes(footerElements?.columns, 'columnItems');
    const composedRouteList = [
        ...navElements,
        ...footerRoutes
    ];

    const routeList = composedRouteList.flatMap((nav) => {
        const composedRoute = {
            path: nav?.linkUrl,
            // TODO: Bind in element dynamically from routeElements array
            element: <App /> // nav?.routeElement,
        };
        const shouldReturn = nav?.isInternalNav ?? false;
        return shouldReturn && composedRoute;
    }).filter((obj) => {
        return obj && true;
    });
    return routeList;
};

export default getRouteList;