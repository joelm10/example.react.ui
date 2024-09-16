import { render } from '@testing-library/react';

import App from '../App';

it('renders without crashing', () => {
    render(<App tab="home" pageTitle='test page title' />);
    // TODO: Add assert
});
