/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-debugging-utils */
// TODO: Fix the test cases to work with the KanbanBoard component
// This file contains tests for the KanbanBoard component using React Testing Library.
// It tests the rendering of the component with default and custom columns,
// and checks if the onCardMove function is called when a card is moved between columns.

// import mock data for the KanbanBoard component
// The mock data simulates the default columns and cards that would be present in the KanbanBoard.
import mockCards from 'components/Library/Widgets/Kanban/__mockData/dataMockCards';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import KanbanBoard from 'components/Library/Widgets/Kanban';
import defaultColumns from 'components/Library/Widgets/Kanban/config/kanbanConfig'; // Import the default columns for testing          
jest.mock('components/Library/Widgets/Kanban/config/kanbanConfig', () => ([
    { id: 'default-1', title: 'Default Column 1', cards: [...mockCards] },
    { id: 'default-2', title: 'Default Column 2', cards: [] },
    { id: 'default-3', title: 'Default Column 3', cards: [] }
]));
const customColumns = [
    { id: 'column-1', title: 'Custom Column 1', cards: [...mockCards] },
    { id: 'column-2', title: 'Custom Column 2', cards: [] }
];

describe('KanbanBoard Widget', () => {
    beforeEach(() => {
        // Clear any previous mocks before each test
        jest.clearAllMocks();
    });
    test('renders KanbanBoard with default columns when no initialColumns provided', () => {
        const { container } = render(<KanbanBoard />);
        expect(container.querySelector('.kanban-board')).toBeInTheDocument();
        const columns = container.querySelectorAll('.kanban-column');
        expect(columns.length).toBe(defaultColumns.length);
    });

    test('renders KanbanBoard with provided initialColumns', () => {
        const { container } = render(<KanbanBoard initialColumns={customColumns} />);
        expect(container.querySelector('.kanban-board')).toBeInTheDocument();
        const columns = container.querySelectorAll('.kanban-column');
        expect(columns.length).toBe(customColumns.length);
    });
    //todo fix broken test
    test.skip('calls onCardMove when a card is moved', () => {
        const mockOnCardMove = jest.fn();

        const { container} =render(<KanbanBoard initialColumns={customColumns} onCardMove={mockOnCardMove} />);

        const card = container.querySelector(`[data-testid="kanban-card-${customColumns[0].cards[0].id}"]`);
        expect(card).toBeInTheDocument();
        // const sourceColumn = screen.getByText('Custom Column 1');
        const targetColumn = screen.getByText('Custom Column 2');
        // Helper to create a mock dataTransfer object for drag-and-drop events
        function createMockDataTransfer(cardId) {
            return {
                setData: jest.fn(),
                getData: jest.fn().mockReturnValue(cardId),
                dropEffect: 'move',
                effectAllowed: 'all',
                files: [],
                items: [],
                types: [],
            };
        }

        const dataTransfer = createMockDataTransfer('card-1');

        fireEvent.dragStart(card, { dataTransfer });
        fireEvent.dragOver(targetColumn, { dataTransfer });
        fireEvent.drop(targetColumn, { dataTransfer });
        fireEvent.drop(targetColumn, { dataTransfer });

        expect(mockOnCardMove).toHaveBeenCalledWith(expect.objectContaining(
            {
                card: customColumns[0].cards[0],
                sourceColumnId: customColumns[0].id,
                targetColumnId: customColumns[1].id
            }
        ));
    });

});