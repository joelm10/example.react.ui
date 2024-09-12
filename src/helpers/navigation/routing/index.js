// route management
import {
    createBrowserRouter
} from 'react-router-dom';

import getRouteList from './generators/getRouteList';

// todo: build out routes to pass into this;
const routeList = getRouteList();
const router = createBrowserRouter(routeList);

export default router;
