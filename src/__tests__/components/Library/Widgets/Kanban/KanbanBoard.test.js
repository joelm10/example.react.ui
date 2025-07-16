/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-debugging-utils */
// TODO: Fix the test cases to work with the KanbanBoard component
// This file contains tests for the KanbanBoard component using React Testing Library.
// It tests the rendering of the component with default and custom columns,
// and checks if the onCardMove function is called when a card is moved between columns.

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import KanbanBoard from 'components/Library/Widgets/Kanban';
import defaultColumns from 'components/Library/Widgets/Kanban/config/kanbanConfig'; // Import the default columns for testing          
jest.mock('components/Library/Widgets/Kanban/config/kanbanConfig', () => ([
    { id: 'default-1', title: 'Default Column 1', cards: [{ id: 'default-card-1', title: 'Default Card 1', content: 'Content' }] },
    { id: 'default-2', title: 'Default Column 2', cards: [{ id: 'default-card-2', title: 'Default Card 2', content: 'Content' }] },
    { id: 'default-3', title: 'Default Column 3', cards: [{ id: 'default-card-3', title: 'Default Card 3', content: 'Content' }] }
]));

describe('KanbanBoard Widget', () => {
    test('renders KanbanBoard with default columns when no initialColumns provided', () => {
        const { container } = render(<KanbanBoard />);
        expect(container.querySelector('.kanban-board')).toBeInTheDocument();
        const columns = container.querySelectorAll('.kanban-column');
        expect(columns.length).toBe(defaultColumns.length);
    });

    test('renders KanbanBoard with provided initialColumns', () => {
        const customColumns = [
            { id: 'column-1', title: 'Custom Column 1', cards: [{ id: 'card-1-1', title: 'Card 1-1', content: 'Content' }] },
            { id: 'column-2', title: 'Custom Column 2', cards: [{ id: 'card-2-1', title: 'Card 2-1', content: 'Content' }] }
        ];
        const { container } = render(<KanbanBoard initialColumns={customColumns} />);
        expect(container.querySelector('.kanban-board')).toBeInTheDocument();
        const columns = container.querySelectorAll('.kanban-column');
        expect(columns.length).toBe(customColumns.length);
    });

    test('calls onCardMove when a card is moved', () => {
        const mockOnCardMove = jest.fn();
        const customColumns = [
            { id: 'column-1', title: 'Column 1', cards: [{ id: 'card-1', title: 'Card 1', content: 'Content for Card 1' }] },
            { id: 'column-2', title: 'Column 2', cards: [{ id: 'card-2', title: 'Card 2', content: 'Content for Card 2' }] }
        ];
        render(<KanbanBoard initialColumns={customColumns} onCardMove={mockOnCardMove} />);

        const card = screen.getByText(customColumns[0].cards[0].content);
        // const sourceColumn = screen.getByText('Column 1');
        const targetColumn = screen.getByText('Column 2');

        // Create a mock dataTransfer object
        const dataTransfer = {
            setData: jest.fn(),
            getData: jest.fn().mockReturnValue('card-1')
        };

        fireEvent.dragStart(card, { dataTransfer });
        fireEvent.dragOver(targetColumn, { dataTransfer });
        fireEvent.drop(targetColumn, { dataTransfer });

        expect(mockOnCardMove).toHaveBeenCalledWith(expect.objectContaining(
            {
                "card": {
                    "content": "Content for Card 1", "id": "card-1", "title": "Card 1"
                }, "sourceColumnId": "column-1", "targetColumnId": "column-2"
            }
        ));
    });

});