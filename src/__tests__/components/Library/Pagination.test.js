/* Pagination */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Pagination from 'client/components/Library/Widgets/Pagination';

const testProps = {
    rootKey: 'test_',
    callback: {
        moveTo: jest.fn()
    }
};

describe('components/Library/<Pagination />', () => {

    test('should return null when no arguments passed', () => {
        const { container } = render(<Pagination {...testProps} />);
        expect(container).toBeEmptyDOMElement();
    });

    test('should render when arguments passed', () => {
        const validTestProps = {
            ...testProps,
            currentPage: 1,
            maxDisplayCount: 12,
            pageLength: 12,
            totalRecords: 20,
        }
        render(<Pagination  {...validTestProps} />);

        const totalRecords = screen.queryByRole('menu');
        expect(totalRecords).toBeTruthy()
    });

    // TODO: add tests for click events forward, back and number
});
