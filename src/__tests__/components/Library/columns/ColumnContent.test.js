import { render } from '@testing-library/react';
import ColumnContent from 'components/Library/Atomic/columns/ColumnContent';

const testProps = {
    content: [],
    styles: {}
};

describe('components/Library/Atomic', () => {
    test('<ColumnContent /> should return null if empty array passed', () => {
        const { container } = render(<ColumnContent {...testProps} />);
        expect(container.innerHTML).toHaveLength(0);
    });

});
