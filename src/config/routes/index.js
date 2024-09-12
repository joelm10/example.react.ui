import App from "../../App";
import ErrorComponent
    from "../../components/Library/Errors";

/**
 * Import ALL components into dictionary, expose via lookup and return
 * @param {string} key 
 * @returns 
 */
const getComponentForRoute = (key, params) => {
    // console.log('getComponentForRoute', key, params);
    const componentLibrary = {
        'app': <App {...params} />,
        '': <App {...params} />,
    };

    const defaultComponent = (<ErrorComponent {...params} />);

    return componentLibrary[key] ?? defaultComponent;
};

export default getComponentForRoute;