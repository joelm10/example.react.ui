import { Fragment, useEffect, useMemo, useState } from 'react';
import ColumnWrapper from './Column';
import { boardEvents, defaultColumns, socketWrapperConfig } from './config/kanbanConfig';
import KanbanHeader from './Header';
import KanbanInfoHeader from './Header/InfoHeader';
import { sortObjectsByOrder } from './helpers/sortObjectsByOrder';
import socketWrapper from './network/socketIO'; // Import your socket configuration
import createSocketEvents from './network/socketIO/events';
import './styles/kanbanBoard.css';
import cloneDeep from 'lodash/cloneDeep';


/**
 * A wrapper component for a Kanban board
 * @param {Object} props - Component props
 * @param {Array} props.initialColumns - Initial columns configuration
 * @param {Function} props.onCardMove - Callback when a card is moved
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Kanban board wrapper component
 */
const KanbanBoard = ({
    // TODO: add an network request to fetch the initial columns and cards
    initialColumns = defaultColumns || [],
    onCardMove,
    children
}) => {

    // Initialize socket once with useMemo to prevent recreation on each render
    const socket = useMemo(() => socketWrapper(socketWrapperConfig), []);

    useEffect(() => createSocketEvents(socket, { onCardMove }, boardEvents),[socket, onCardMove]);

    // ensure initialColumns is an array and sort cards by displayOrder
    const initialSortedColumns = useMemo(() => {
        return initialColumns.map((column) => ({
            ...column,
            cards: sortObjectsByOrder(column.cards, 'displayOrder')
        }));
    }, [initialColumns]);

    const [columns, setColumns] = useState(initialSortedColumns);
    const [draggingCard, setDraggingCard] = useState(null);
    const [dragOverCardId, setDragOverCardId] = useState(null);

    /**
     * An object containing actions to update Kanban board data.
     * Handles events that trigger data updates, such as moving cards between columns or adding new cards.
     * The actions update the local state and can emit socket events to synchronize with the backend.
     * 
     * @property {Function} updateCardState - Updates the columns state and emits a MOVE_CARD event via socket.
     * @param {Array} updatedColumns - The new columns array after a data change.
     */
    const dataUpdateActions = {
        // handle all events which should trigger a data update
        updateCardState: (updatedColumns) => {
            if (!updatedColumns || !Array.isArray(updatedColumns)) {
                // logger('error', 'updateCardState() called with invalid columns:', updatedColumns);
                return;
            }
            // logger('info', 'updateCardState()->Updating card state with new columns:', updatedColumns);
            socket.emit(boardEvents.MOVE_CARD, updatedColumns);
            setColumns(updatedColumns);
        }
    };

    const handleDragStart = (e, card, sourceColumnId) => {
        setDraggingCard({ card, sourceColumnId });
        e.dataTransfer.effectAllowed = 'move';
        // Add some transparency to the dragged element
        e.target.style.opacity = '0.4';
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1';
        setDraggingCard(null);
        setDragOverCardId(null);
    };

    const handleDragOver = (e, cardId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverCardId(cardId);
    };

    const handleDrop = async (e, targetColumnId, targetCardId = null) => {
        e.preventDefault();

        if (!draggingCard) {
            // logger('info', 'handleDrop() No card is being dragged');
            return;
        }

        const { card, sourceColumnId } = draggingCard;

        // Create a deep copy of the columns
        let updatedColumns = cloneDeep(columns);

        if (sourceColumnId === targetColumnId) {
            // logger('info', `Card ${card.id} dropped in the same column ${sourceColumnId} at order ${targetCardId || 'end'}`);

            // Find the source column
            const columnIndex = updatedColumns.findIndex(col => col.id === sourceColumnId);
            if (columnIndex === -1) return;

            const column = updatedColumns[columnIndex];

            // Remove the dragged card from its current position
            const newCards = column.cards.filter(c => c.id !== card.id);

            if (targetCardId) {
                // Insert the card at the new position
                const targetIndex = newCards.findIndex(c => c.id === targetCardId);
                if (targetIndex !== -1) {
                    newCards.splice(targetIndex, 0, card);
                } else {
                    newCards.push(card); // If target card not found, add to the end
                }
            } else {
                // If no target card (dropped at empty space), add to the end
                newCards.push(card);
            }

            // Update displayOrder for all cards in the column
            newCards.forEach((c, index) => {
                c.displayOrder = index;
            });

            // Update the column with the new card order
            updatedColumns[columnIndex] = {
                ...column,
                cards: newCards
            };

            await dataUpdateActions.updateCardState(updatedColumns);
            return;
        }

        // Handle moving between different columns
        updatedColumns = updatedColumns.map(column => {
            // Remove from source column
            if (column.id === sourceColumnId) {
                // logger('info', `Removing card ${card.id} from column ${sourceColumnId}`);
                const filteredCards = column.cards.filter(c => c.id !== card.id);

                // Update displayOrder for remaining cards in source column
                filteredCards.forEach((c, index) => {
                    c.displayOrder = index;
                });

                return {
                    ...column,
                    cards: filteredCards
                };
            }

            // Add to target column
            if (column.id === targetColumnId) {
                // logger('info', `Adding card ${card.id} to column ${targetColumnId}`);
                const newCards = [...column.cards];

                if (targetCardId) {
                    // Insert before the target card
                    const targetIndex = newCards.findIndex(c => c.id === targetCardId);
                    if (targetIndex !== -1) {
                        newCards.splice(targetIndex, 0, card);
                    } else {
                        newCards.push(card);
                    }
                } else {
                    // No target card, just append to the end
                    newCards.push(card);
                }

                // Update displayOrder for all cards in target column
                newCards.forEach((c, index) => {
                    c.displayOrder = index;
                });

                return {
                    ...column,
                    cards: newCards
                };
            }
            return column;
        });

        if (updatedColumns && updatedColumns.length > 0) {
            // logger('info', 'Updated columns after drop:', updatedColumns);
            await dataUpdateActions.updateCardState(updatedColumns);
        } else {
            // logger('error', 'No updated columns provided after drop');
        }
    };

    const hasCards = columns.some(column => Array.isArray(column.cards) && column.cards.length > 0);

    const columnContent = hasCards
        ? columns.map(column => (
            <ColumnWrapper
                key={column.id}
                column={column}
                dragOverCardId={dragOverCardId}
                callbacks={{
                    handleDragStart,
                    handleDragEnd,
                    handleDragOver,
                    handleDrop,
                }}
            />
        ))
        : (<div>No Cards available.</div>);

    return (
        <Fragment>
            <KanbanInfoHeader />
            <KanbanHeader />

            <div className="kanban-board">
                <div className='kanban-columns'>
                    {columnContent}
                </div>
            </div >
        </Fragment>
    );
};

export default KanbanBoard;