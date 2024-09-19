import { render } from '@testing-library/react';

import ColumnLayout from '../../../components/Library/Atomic/columns';

const testProps = {
    content: [],
    styles: {}
};
describe('components/Library/Atomic/columns', () => {
    test('<ColumnLayout /> should return null if empty array passed', () => {
        const { container } = render(<ColumnLayout {...testProps} />);
        expect(container.innerHTML).toHaveLength(0);
    });

});
