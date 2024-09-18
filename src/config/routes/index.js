import App from "../../App";
import ErrorComponent
    from "../../components/Library/Atomic/Errors";

/**
 * Import ALL components into dictionary, expose via lookup and return
 * @param {string} key 
 * @returns 
 */
const getComponentForRoute = (key, params) => {
    const componentLibrary = {
        // TODO: Build out with context for new in-app routes
        'app': <App {...params} />,
        '': <App {...params} />,
    };

    const defaultComponent = (<ErrorComponent {...params} />);
    return componentLibrary[key] ?? defaultComponent;
};

export default getComponentForRoute;