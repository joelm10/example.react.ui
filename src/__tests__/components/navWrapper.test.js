import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'

import NavWrapper from '../../layout/header/nav';
import navElements from '../../config/nav';

const testProps = {
    navElements: navElements
}

describe('components/layout/', () => {
    test('<NavWrapper /> should return null when no elements passed', () => {
        const { container } = render(<NavWrapper />);
        expect(container).toBeTruthy();
    });

    test('<NavWrapper /> should render empty when elements passed', () => {
        render(
            <BrowserRouter>

                <NavWrapper {...testProps} />
            </BrowserRouter>
        );

        // outer container present
        const navWrapper = screen.getAllByRole('navigation');
        expect(navWrapper).toHaveLength(1);
        // elements iterated on
        const navItems = screen.getAllByRole('menuitem').length;
        expect(navItems).toEqual(testProps.navElements.length);
    });
});