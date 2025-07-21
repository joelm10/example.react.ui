import { useState, useEffect, useMemo, Fragment } from 'react';
import './styles/kanbanBoard.css';
import defaultColumns from './config/kanbanConfig';
import KanbanHeader from './Header';
import KanbanInfoHeader from './Header/InfoHeader';
import ColumnWrapper from './Column';
import logger from 'helpers/utils/logging';
import socketWrapper from './network/socketIO'; // Import your socket configuration
import { sortObjectsByOrder } from './helpers/sortObjectsByOrder';

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
    // TODO: Move to config or environment variable
    const endPointUrl = 'http://localhost:3000'; // Replace with your actual endpoint URL
    const boardEvents = {
        LOAD_CARDS: 'loadCards',
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
        // Listen for card-related events
        if (!socket) {
            logger('error', 'Socket connection not available');
            return;
        }
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
            // Handle card add logic here, to be triggered from UI or other events
        });
        // triggered when card is updated in column, or moved across columns
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
    }, [boardEvents.ADD_CARD, boardEvents.DELETE_CARD, boardEvents.LOAD_CARDS, boardEvents.MOVE_CARD, boardEvents.SAVE_CARD, boardEvents.UPDATE_CARD, onCardMove, socket]);

    // ensure initialColumns is an array and sort cards by displayOrder
    const initialSortedColumns = initialColumns.map((column) => {
        return {
            ...column,
            cards: sortObjectsByOrder(column.cards, 'displayOrder')
        };
    });

    const [columns, setColumns] = useState(initialSortedColumns);
    const [draggingCard, setDraggingCard] = useState(null);
    const [dragOverCardId, setDragOverCardId] = useState(null);

    /**
     * TODO: build out the data update actions
     * This will handle all events which should trigger a data update
     * such as moving cards between columns, adding new cards, etc.
     * This will be used to update the state of the Kanban board
     * and can also be extended to make network requests to update the backend. 
     */
    const dataUpdateActions = {
        // handle all events which should trigger a data update
        updateCardState: (updatedColumns) => {
            if (!updatedColumns || !Array.isArray(updatedColumns)) {
                logger('error', 'updateCardState() called with invalid columns:', updatedColumns);
                return;
            }
            logger('info', 'updateCardState()->Updating card state with new columns:', updatedColumns);
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

    // const handleDrop = async (e, targetColumnId, targetCardId = null) => {
    //     e.preventDefault();

    //     if (!draggingCard) {
    //         logger('info', 'handleDrop() No card is being dragged');
    //         return;
    //     }

    //     const { card, sourceColumnId } = draggingCard;

    //     // Create a deep copy of the columns
    //     let updatedColumns = JSON.parse(JSON.stringify(columns));

    //     if (sourceColumnId === targetColumnId) {
    //         logger('info', `Card ${card.id} dropped in the same column ${sourceColumnId}`);

    //         // Find the source column
    //         const columnIndex = updatedColumns.findIndex(col => col.id === sourceColumnId);
    //         if (columnIndex === -1) return;

    //         const column = updatedColumns[columnIndex];

    //         // Remove the dragged card from its current position
    //         const newCards = column.cards.filter(c => c.id !== card.id);

    //         if (targetCardId) {
    //             // Insert the card at the new position
    //             const targetIndex = newCards.findIndex(c => c.id === targetCardId);
    //             if (targetIndex !== -1) {
    //                 newCards.splice(targetIndex, 0, card);
    //             } else {
    //                 newCards.push(card); // If target card not found, add to the end
    //             }
    //         } else {
    //             // If no target card (dropped at empty space), add to the end
    //             newCards.push(card);
    //         }

    //         // Update the column with the new card order
    //         updatedColumns[columnIndex] = {
    //             ...column,
    //             cards: newCards
    //         };

    //         await dataUpdateActions.updateCardState(updatedColumns);
    //         return;
    //     }

    //     // Handle moving between different columns
    //     updatedColumns = updatedColumns.map(column => {
    //         // Remove from source column
    //         if (column.id === sourceColumnId) {
    //             logger('info', `Removing card ${card.id} from column ${sourceColumnId}`);
    //             return {
    //                 ...column,
    //                 cards: column.cards.filter(c => c.id !== card.id)
    //             };
    //         }

    //         // Add to target column
    //         if (column.id === targetColumnId) {
    //             logger('info', `Adding card ${card.id} to column ${targetColumnId}`);
    //             const newCards = [...column.cards];

    //             if (targetCardId) {
    //                 // Insert before the target card
    //                 const targetIndex = newCards.findIndex(c => c.id === targetCardId);
    //                 if (targetIndex !== -1) {
    //                     newCards.splice(targetIndex, 0, card);
    //                 } else {
    //                     newCards.push(card);
    //                 }
    //             } else {
    //                 // No target card, just append to the end
    //                 newCards.push(card);
    //             }

    //             return {
    //                 ...column,
    //                 cards: newCards
    //             };
    //         }
    //         return column;
    //     });

    //     if (updatedColumns && updatedColumns.length > 0) {
    //         logger('info', 'Updated columns after drop:', updatedColumns);
    //         await dataUpdateActions.updateCardState(updatedColumns);
    //     } else {
    //         logger('error', 'No updated columns provided after drop');
    //     }
    // };

    // Pass additional props to ColumnWrapper for handling card-level drag events

    const handleDrop = async (e, targetColumnId, targetCardId = null) => {
        e.preventDefault();

        if (!draggingCard) {
            logger('info', 'handleDrop() No card is being dragged');
            return;
        }

        const { card, sourceColumnId } = draggingCard;

        // Create a deep copy of the columns
        let updatedColumns = JSON.parse(JSON.stringify(columns));

        if (sourceColumnId === targetColumnId) {
            logger('info', `Card ${card.id} dropped in the same column ${sourceColumnId} at order ${targetCardId || 'end'}`);

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
                logger('info', `Removing card ${card.id} from column ${sourceColumnId}`);
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
                logger('info', `Adding card ${card.id} to column ${targetColumnId}`);
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
            logger('info', 'Updated columns after drop:', updatedColumns);
            await dataUpdateActions.updateCardState(updatedColumns);
        } else {
            logger('error', 'No updated columns provided after drop');
        }
    };


    const columnContent = columns && columns.map(column => (
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
    ));

    return (
        <Fragment>
            <KanbanInfoHeader />
            <KanbanHeader />

            <div className="kanban-board" >
                {columnContent}
                {children}
            </div >
        </Fragment>
    );
};

export default KanbanBoard;