/**
 * This file is skipped from coverage report
 * WHY: Renders self contained app to created dom element
 */

import * as ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client';
import {
    RouterProvider,
} from "react-router-dom";

import router from '../../..//navigation/routing';
import logger from '../../../utils/logging';

import App from './../../../../App';

/**
 * Wrapper for rending the React application, optional client side routing
 * @param {string} domMountPoint - (Optional) target place to add app to
 * @param {boolean} useRouting - (Optional) use clientside routing 
 * @param {string} defaultTab - (optional) set default nav tab
 */
const mountUI = (domMountPoint = 'root', useRouting = true, defaultTab = 'home') => {
    try {
        // const useRouting = true;
        const container = document.getElementById(domMountPoint);

        // With routing
        if (useRouting) {
            const routedRoot = ReactDOM.createRoot(container);
            routedRoot.render(
                <RouterProvider
                    router={router}
                />
            );
        } else {
            // With-out routing
            const root = createRoot(container);
            root.render(<App tab={defaultTab} />);
        }

    } catch (e) {
        logger('err', `MountUI() error ${e}`);
    }
};

export default mountUI;