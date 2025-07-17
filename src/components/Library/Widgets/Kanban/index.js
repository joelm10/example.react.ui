import { useState } from 'react';
import './styles/kanbanBoard.css';
import defaultColumns from './config/kanbanConfig';
import ColumnWrapper from './Column';
import logger from 'helpers/utils/logging';

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
        // console.log('handleDrop called with targetColumnId:', targetColumnId);
        if (!draggingCard) {
            logger('info', 'No card is being dragged');
            return;
        }
        const { card, sourceColumnId } = draggingCard;

        logger('info', `Card ${card.id} dropped from column ${sourceColumnId} to column ${targetColumnId}`);
        if (sourceColumnId === targetColumnId) {
            logger('info', `Card ${card.id} dropped in the same column ${sourceColumnId}`);
            return;
        }
        const updatedColumns = columns.map(column => {
            // Remove from source column
            if (column.id === sourceColumnId) {
                logger('info', `Removing card ${card.id} from column ${sourceColumnId}`);
                return {
                    ...column,
                    cards: column.cards.filter(c => c.id !== card.id)
                };
            }

            // Add to target column
            if (column.id === targetColumnId) {
                logger('info', `Adding card ${card.id} to column ${targetColumnId}`);
                return {
                    ...column,
                    cards: [...column.cards, card]
                };
            }
            logger('info', `No changes made to column ${column.id}`);
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