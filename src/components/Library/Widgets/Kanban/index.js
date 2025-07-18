import { useState, useEffect, useMemo } from 'react';
import './styles/kanbanBoard.css';
import defaultColumns from './config/kanbanConfig';
import ColumnWrapper from './Column';
import logger from 'helpers/utils/logging';
import socketWrapper from './network/socketIO'; // Import your socket configuration

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
    initialColumns = defaultColumns,
    onCardMove,
    children
}) => {
    // TODO: Move to config or environment variable
    const endPointUrl = 'http://localhost:3000'; // Replace with your actual endpoint URL
    const boardEvents = {
        SAVE_CARD: 'saveCard',
        MOVE_CARD: 'moveCard',
        DELETE_CARD: 'deleteCard',
        ADD_CARD: 'addCard',
        UPDATE_CARD: 'updateCard',
    };
    // Initialize socket once with useMemo to prevent recreation on each render
    const socket = useMemo(() => socketWrapper(
        { endPointUrl, options: { transports: ['websocket'] } }
    ), [endPointUrl]);

    useEffect(() => {
        socket.on(boardEvents.SAVE_CARD, (data) => {
            logger('info', 'Card saved:', data);
            // Handle card save logic here
        });
        socket.on(boardEvents.MOVE_CARD, (data) => {
            logger('info', 'Card moved:', data);
            // Handle card move logic here
            if (onCardMove) {
                onCardMove(data);
            }
        });
        socket.on(boardEvents.DELETE_CARD, (data) => {
            logger('info', 'Card deleted:', data);
            // Handle card delete logic here
        });
        socket.on(boardEvents.ADD_CARD, (data) => {
            logger('info', 'Card added:', data);
            // Handle card add logic here
        });
        socket.on(boardEvents.UPDATE_CARD, (data) => {
            logger('info', 'Card updated:', data);
            // Handle card update logic here
        });
        // Cleanup socket listeners on unmount
        return () => {
            socket.off(boardEvents.SAVE_CARD);
            socket.off(boardEvents.MOVE_CARD);
            socket.off(boardEvents.DELETE_CARD);
            socket.off(boardEvents.ADD_CARD);
            socket.off(boardEvents.UPDATE_CARD);
        }
    }, [boardEvents.ADD_CARD, boardEvents.DELETE_CARD, boardEvents.MOVE_CARD, boardEvents.SAVE_CARD, boardEvents.UPDATE_CARD, onCardMove, socket]);

    const [columns, setColumns] = useState(initialColumns);
    const [draggingCard, setDraggingCard] = useState(null);
    /**
     * TODO: build out the data update actions
     * This will handle all events which should trigger a data update
     * such as moving cards between columns, adding new cards, etc.
     * This will be used to update the state of the Kanban board
     * and can also be extended to make network requests to update the backend. 
     */
    const dataUpdateActions = {
        // handle all events which should trigger a data update
        updateCardState: async (updatedColumns) => {
            if (!updatedColumns || !Array.isArray(updatedColumns)) {
                logger('error', 'updateCardState() called with invalid columns:', updatedColumns);
                return;
            }
            logger('info', 'updateCardState()->Updating card state with new columns:', updatedColumns);
            await socket.emit(boardEvents.MOVE_CARD, updatedColumns);
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
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = async (e, targetColumnId) => {
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
        // TODO: add sort order of cards in the column
        // Update the columns state by removing the card from the source column
        // and adding it to the target column
        // logger('info', 'Updating columns after drop');
        // console.log('Columns before drop:', columns);
        // logger('info', 'Columns before drop:', columns);
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
            // logger('info', `No changes made to column ${column.id}`);
            return column;
        });

        logger('info', 'Updated columns after drop:', updatedColumns);
        // should fire network request to update the backend
        await dataUpdateActions.updateCardState(updatedColumns);

    };

    return (
        <div className="kanban-board" >
            {
                columns.map(column => (
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
                ))
            }
            {children}
        </div >
    );
};

export default KanbanBoard;