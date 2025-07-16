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

    test('Card component handles click events correctly', () => {
        const handleClick = jest.fn();
        const cardProps = {
            cardKey: 'card-2',
            card: {
                content: 'Clickable Card'
            },
            callbacks: {
                ...mockCallbacks,
                handleClick
            }
        };

        render(<Card {...cardProps} />);

        const cardElement = screen.getByText('Clickable Card');
        fireEvent.click(cardElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('Card component displays custom className when provided', () => {
        const cardProps = {
            cardKey: 'card-3',
            card: {
                content: 'Custom Class Card',
                className: 'custom-card-class'
            },
            callbacks: mockCallbacks
        };

        render(<Card {...cardProps} />);

        const cardElement = screen.getByText('Custom Class Card');
        expect(cardElement).toHaveClass('kanban-card');
        expect(cardElement).toHaveClass('custom-card-class');
    });

    test('Card component with nested HTML structure', () => {
        const nestedContent = (
            <div data-testid="nested-container">
                <h3>Card Title</h3>
                <p>Card description</p>
                <span className="metadata">Priority: High</span>
            </div>
        );
        
        const cardProps = {
            cardKey: 'nested-card',
            card: {
                content: nestedContent
            },
            callbacks: mockCallbacks
        };

        render(<Card {...cardProps} />);

        expect(screen.getByTestId('nested-container')).toBeInTheDocument();
        expect(screen.getByText('Card Title')).toBeInTheDocument();
        expect(screen.getByText('Card description')).toBeInTheDocument();
        expect(screen.getByText('Priority: High')).toBeInTheDocument();
    });

    test('Card component is disabled when specified', () => {
        const cardProps = {
            cardKey: 'disabled-card',
            card: {
                content: 'Disabled Card',
                disabled: true
            },
            callbacks: mockCallbacks
        };

        render(<Card {...cardProps} />);

        const cardElement = screen.getByText('Disabled Card');
        expect(cardElement.parentElement).toHaveAttribute('draggable', 'false');
        expect(cardElement.parentElement).toHaveClass('disabled');
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

    test.only('Card component has correct attributes', () => {
        const cardProps = {
            cardKey: 'card-unique-key',
            card: {
                content: 'Card with Attributes'
            },
            callbacks: mockCallbacks
        };

        render(<Card {...cardProps} />);

        const cardElement = screen.getByText('Card with Attributes');

        expect(cardElement.parentElement).toHaveAttribute('draggable');
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