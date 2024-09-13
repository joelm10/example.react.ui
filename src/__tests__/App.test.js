import { render, screen } from '@testing-library/react';

import App from '../App';

it('renders without crashing', () => {
    render(<App tab="home" pageTitle='test page title' />);

});
