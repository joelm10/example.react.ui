import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../../../../../components/Library/Widgets/Kanban/Card';
import mockCards from 'components/Library/Widgets/Kanban/__mockData/dataMockCards';
/* Note all these fields are required for cardSchema.js to be valid. 
    'id',
    'cardKey',
    'summary',
    'status',
    'issueType',
    'epic',
    'sprint',
    'storyPoints': 6

*/

const mockProps = {
    cardKey: mockCards[0].cardKey,
    card: mockCards[0],
    callbacks: {}
}

describe('Card Component base values', () => {
    // Use the first mock card for testing

    test('renders card with correct title and description', () => {
        render(<Card {...mockProps} />);
        const summary = screen.getByText(mockProps.card.summary);
        expect(summary).toBeInTheDocument();
        expect(screen.getByText(mockProps.card.description)).toBeInTheDocument();
    });

    test('renders priority indicator', () => {
        render(<Card {...mockProps} />);

        const priorityElement = screen.getByText(/high/i);
        expect(priorityElement).toBeInTheDocument();
    });

    test('renders card with different priority levels', () => {
        const lowPriorityProps = { ...mockProps, priority: 'low' };
        const { rerender } = render(<Card {...lowPriorityProps} />);

        expect(screen.getByText(/low/i)).toBeInTheDocument();

        rerender(<Card {...{ ...mockProps, priority: 'medium' }} />);
    });
});

describe('<Card /> Component optional schema elements', () => {
    test.skip('renders assignee information', () => {
        render(<Card {...mockProps} />);
        const assigneeName = screen.getByText(mockProps.card.assignee.name);
        expect(assigneeName).toBeInTheDocument();
    });
});