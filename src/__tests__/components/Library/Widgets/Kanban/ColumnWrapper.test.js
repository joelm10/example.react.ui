/* eslint-disable testing-library/no-node-access */
// TODO: Fix the above rule violation by using getByTestId or similar methods instead of accessing the node directly.
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import after mocking
import ColumnWrapper from 'client/components/Library/Widgets/Kanban/Column';

// Mock Card component and capture props for verification in tests
let cardPropsSpy = jest.fn();

jest.mock('client/components/Library/Widgets/Kanban/Card', () => (props) => {
    // cardPropsSpy(props);
    jest.fn(props);
    return (
        <div
            data-testid={`card-${props.card.id}`}
            draggable
            onDragStart={(e) => props.callbacks.handleDragStart(e, props.card, props.column?.id || 'column-1')}
        >
            {props.card.title}
        </div>
    );
});

describe('ColumnWrapper Component', () => {
    const mockColumn = {
        id: 'column-1',
        title: 'To Do',
        cards: [
            { id: 'card-1', title: 'Task 1', description: 'Do something' },
            { id: 'card-2', title: 'Task 2', description: 'Do something else' }
        ]
    };

    const mockCallbacks = {
        handleDragOver: jest.fn(),
        handleDrop: jest.fn(),
        handleDragStart: jest.fn(),
        handleDragEnd: jest.fn()
    };
    beforeEach(() => {
        jest.clearAllMocks();
        cardPropsSpy.mockClear();
    });

    test.skip('handleDragStart callback receives correct parameters', () => {
        render(<ColumnWrapper column={mockColumn} callbacks={mockCallbacks} />);

        // Find the props for the first card
        // Capture the handleDragStart callback passed to the first Card for testing
        const firstCardCall = cardPropsSpy.mock.calls.find(
            ([props]) => {
                return props.card.id === 'card-1'
            });

        // Ensure firstCardCall exists before proceeding
        expect(firstCardCall).toBeDefined();
        // Verify the original callback was called with correct params
        const mockEvent = {}; // Define a mock event object
        expect(mockCallbacks.handleDragStart).toHaveBeenCalledWith(
            mockEvent,
            mockColumn.cards[0],
            mockColumn.id
        );
    });

    test('triggers handleDrop when dropping onto column', () => {
        render(<ColumnWrapper column={mockColumn} callbacks={mockCallbacks} />);

        const columnElement = screen.getByText('To Do').closest('.kanban-column');
        fireEvent.drop(columnElement);

        expect(mockCallbacks.handleDrop).toHaveBeenCalledTimes(1);
        expect(mockCallbacks.handleDrop).toHaveBeenCalledWith(expect.any(Object), 'column-1');
    });

    test('renders column title', () => {
        render(<ColumnWrapper column={mockColumn} callbacks={mockCallbacks} />);

        const titleElement = screen.getByText(mockColumn.title);
        expect(titleElement).toBeInTheDocument();
    });

});