import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from 'components/Library/Widgets/Kanban/Card';
const mockCallbacks = {
    handleDragStart: jest.fn(),
    handleDragEnd: jest.fn()
};
describe('<Card', () => {
    beforeEach(() => {
        // Clear any previous mocks or state before each test
        jest.clearAllMocks();
    });

    test('Card component renders with correct content', () => {
        const cardProps = {
            cardKey: 'card-1',
            card: {
                content: 'Test Card Content'
            },
            callbacks: mockCallbacks
        };

        render(<Card {...cardProps} />);

        const cardElement = screen.getByText('Test Card Content');
        expect(cardElement).toBeInTheDocument();
        expect(cardElement).toHaveClass('kanban-card');
    });

    test('Card component handles drag events correctly', () => {
        const cardProps = {
            cardKey: 'card-1',
            card: {
                content: 'Draggable Card'
            },
            callbacks: mockCallbacks
        };

        render(<Card {...cardProps} />);

        const cardElement = screen.getByText('Draggable Card');

        // Simulate drag start
        fireEvent.dragStart(cardElement);
        expect(mockCallbacks.handleDragStart).toHaveBeenCalledTimes(1);

        // Simulate drag end
        fireEvent.dragEnd(cardElement);
        expect(mockCallbacks.handleDragEnd).toHaveBeenCalledTimes(1);
    });

    test('Card component has correct attributes', () => {
        const cardProps = {
            cardKey: 'card-unique-key',
            card: {
                content: 'Card with Attributes'
            },
            callbacks: mockCallbacks
        };

        render(<Card {...cardProps} />);
        const cardElement = screen.getByText('Card with Attributes');
        expect(cardElement).toHaveAttribute('draggable');
        expect(cardElement).toHaveClass('kanban-card');

    });

    test('Card component renders complex content correctly', () => {
        const mockCallbacks = {
            handleDragStart: jest.fn(),
            handleDragEnd: jest.fn()
        };

        const complexContent = <div data-testid="complex-content"><span>Complex</span> Card Content</div>;

        const cardProps = {
            cardKey: 'complex-card',
            card: {
                content: complexContent
            },
            callbacks: mockCallbacks
        };

        render(<Card {...cardProps} />);

        expect(screen.getByTestId('complex-content')).toBeInTheDocument();
        expect(screen.getByText('Complex')).toBeInTheDocument();
        expect(screen.getByText('Card Content')).toBeInTheDocument();
    });
});