import { render, screen, within } from '@testing-library/react';

import ErrorWrapper from '../../../components/Library/Errors';

const mockPath = 'http://google.com?q=test';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: mockPath
    })
}));

describe('components/Library/Errors', () => {
    test('<ErrorWrapper /> should render and show current path in error message container', () => {
        const { container } = render(<ErrorWrapper />);
        // Verify component render correctlya
        expect(container).toBeTruthy();

        // Verify correct error page content is generated
        const errWrapper = screen.getByRole('article');
        const expectedText = `An error has occured, cant find page "${mockPath}"`;
        const expected = within(errWrapper).getByText(expectedText).textContent;
        expect(expected).toEqual(expectedText);
    });
});