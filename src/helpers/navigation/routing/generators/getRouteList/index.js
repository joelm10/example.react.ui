import ErrorComponent from '../../../../../components/Library/Errors';
// routing within app
import footerElements from '../../../../../config/footer';
import navElements from '../../../../../config/nav';

import getNestedRoutes from '../getNestedRoutes';
import getComponentForRoute from '../../../../../config/routes';

// extract only internal routes to be supported 
/**
 * Generate list of internal app routes to support, 
 *  from config values - nav and footer
 * @returns {array} flat array to be consumed by react-router-dom 
 */
const getRouteList = (props) => {
    const { rootPath = '/', columnKey = 'columnItems' } = props = {};

    const footerRoutes = getNestedRoutes(footerElements?.columns, columnKey);
    const composedRouteList = [
        {
            linkUrl: '',
            routeElement: 'app',
            isInternalNav: true,
            routeParams: {
                pageTitle: 'App Home'
            },
            ...props
        },
        // root link
        {
            linkUrl: rootPath,
            // TODO: confirm root path
            routeElement: 'app',
            isInternalNav: true,
            routeParams: {
                pageTitle: 'App Home'
            },
            ...props
        },
        ...navElements,
        ...footerRoutes
    ];
    // de-duplicate routes before iteration
    composedRouteList.filter((item, index) => {
        return composedRouteList.indexOf(item) === index;
    });

    let routeList = composedRouteList.flatMap((nav) => {
        const routeElement = getComponentForRoute(nav?.routeElement, nav?.routeParams);
        const composedRoute = {
            path: nav?.linkUrl,
            element: routeElement,
            ...props,
            errorElement: <ErrorComponent />
        };
        const shouldReturn = nav?.isInternalNav ?? false;
        return shouldReturn && composedRoute;
    }).filter((obj) => {
        return obj && true;
    });
    return routeList;
};

export default getRouteList;