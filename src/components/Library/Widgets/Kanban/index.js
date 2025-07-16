import { useState } from 'react';
import './styles/kanbanBoard.css';
import defaultColumns from './config/kanbanConfig';
import ColumnWrapper from './Column';

/**
 * A wrapper component for a Kanban board
 * @param {Object} props - Component props
 * @param {Array} props.initialColumns - Initial columns configuration
 * @param {Function} props.onCardMove - Callback when a card is moved
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Kanban board wrapper component
 */
const KanbanBoard = ({
    initialColumns = defaultColumns,
    onCardMove,
    children
}) => {
    const [columns, setColumns] = useState(initialColumns);
    const [draggingCard, setDraggingCard] = useState(null);

    const handleDragStart = (e, card, sourceColumnId) => {
        setDraggingCard({ card, sourceColumnId });
        e.dataTransfer.effectAllowed = 'move';
        // Add some transparency to the dragged element
        e.target.style.opacity = '0.4';
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1';
        setDraggingCard(null);
    };

    const handleDragOver = (e, columnId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetColumnId) => {
        e.preventDefault();

        if (!draggingCard) return;

        const { card, sourceColumnId } = draggingCard;

        if (sourceColumnId === targetColumnId) return;

        const updatedColumns = columns.map(column => {
            // Remove from source column
            if (column.id === sourceColumnId) {
                return {
                    ...column,
                    cards: column.cards.filter(c => c.id !== card.id)
                };
            }

            // Add to target column
            if (column.id === targetColumnId) {
                return {
                    ...column,
                    cards: [...column.cards, card]
                };
            }

            return column;
        });

        setColumns(updatedColumns);

        if (onCardMove) {
            onCardMove({ card, sourceColumnId, targetColumnId });
        }
    };

    return (
        <div className="kanban-board">
            {columns.map(column => (
                <ColumnWrapper
                    key={column.id}
                    column={column}
                    callbacks={{
                        handleDragStart,
                        handleDragEnd,
                        handleDragOver,
                        handleDrop,
                    }}
                />
            ))}
            {children}
        </div>
    );
};

export default KanbanBoard;