import { createRoot } from 'react-dom/client';
import * as ReactDOM from "react-dom/client";

// TODO: Move to /helpers/render/index.js

import {
    RouterProvider,
} from "react-router-dom";


import App from './App';

import router from './helpers/navigation/routing';

const useRouting = true;

const container = document.getElementById('root');

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
    root.render(<App tab="home" />);
}

