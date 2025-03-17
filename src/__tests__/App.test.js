import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'

import App from 'App';
describe('Base Application', () => {
    test('<App /> should render correctly', () => {
        render(
            <BrowserRouter>
                <App tab="home" pageTitle='test page title here' />
            </BrowserRouter>
        );
        // TODO: Add assert
    });

});