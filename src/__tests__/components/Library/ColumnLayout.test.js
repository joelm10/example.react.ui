import { render } from '@testing-library/react';

import ColumnLayout from 'components/Library/Atomic/columns';

const testProps = {
    invalid: {},
    valid: {
        content: [],
        styles: {}
    }

};

describe('components/Library/Atomic/columns', () => {
    test('<ColumnLayout /> should return null if empty array passed', () => {
        const { container } = render(<ColumnLayout {...testProps.invalid} />);
        expect(container.innerHTML).toHaveLength(0);
    });
    // TODO: write test with content
    test.skip('<ColumnLayout /> should return markup with content applied if array', () => {
        // TODO: setup data, and assert
        // const { container } = render(<ColumnLayout {...testProps.valid} />);

    });

});
