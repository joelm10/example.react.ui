import ErrorComponent from 'client/components/Library/Atomic/Errors';
// routing within app
import footerElements from 'client/config/footer';
import navElements from 'client/config/nav';

import getComponentForRoute from 'client/config/routes';
import getNestedRoutes from '../getNestedRoutes';
// TODO: fix this deep relative import path
import getChartList from '../../../../../components/Library/Widgets/Charts/helpers/getChartList';


/**
 * Generate list of internal app routes to support, 
 *  from config values - nav and footer
 * @returns {array} flat array to be consumed by react-router-dom 
 */
const getRouteList = (props) => {
    const { rootPath = '/', columnKey = 'columnItems' } = props = {};

    const footerRoutes = getNestedRoutes(footerElements?.columns, columnKey);

    // generate sub nav for direct link to chart types
    const chartRoutes = getChartList().map((obj) => {
        const route = {
            label: obj?.title,
            routeElement: 'app',
            isInternalNav: true,
            itemType: 'link',
            linkUrl: `/chart/${obj?.title}`,
            routeParams: {
                pageTitle: obj?.title
            }
        };
        return route;
    });

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
        ...footerRoutes,
        ...chartRoutes
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