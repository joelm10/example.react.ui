import App from '../../../../../App';
// routing within app
import footerElements from '../../../../../config/footer';
import navElements from '../../../../../config/nav';

import getNestedRoutes from '../getNestedRoutes';

// extract only internal routes to be supported 
/**
 * Generate list of internal app routes to support, 
 *  from config values - nav and footer
 * @returns {array} flat array to be consumed by react-router-dom 
 */
const getRouteList = (props = {}) => {
    const { rootPath = '/', columnKey = 'columnItems' } = props = {};

    const footerRoutes = getNestedRoutes(footerElements?.columns, columnKey);
    const composedRouteList = [
        // root link
        {
            linkUrl: rootPath,
            // TODO: confirm root path
            element: <App />,
            isInternalNav: true
        },
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