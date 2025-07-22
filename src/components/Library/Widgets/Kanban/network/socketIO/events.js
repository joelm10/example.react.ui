import logger from "helpers/utils/logging";
/**
 * Creates and sets up socket event listeners for card operations in a Kanban board.
 * 
 * @param {Object} socket - The socket connection object to listen for events
 * @param {Object} callbacks - Object containing callback functions
 * @param {Function} [callbacks.onCardMove] - Callback function to execute when a card is moved
 * @returns {Function} Cleanup function to remove all socket listeners when component unmounts
 * @throws {Error} Logs an error if socket connection is not available
 */
const createSocketEvents = (socket, callbacks, eventNamespace) => {
    const { onCardMove, onCardSave, onCardDelete, onCardAdd, onCardUpdate } = callbacks || {};

    if (!eventNamespace) {
        logger('error', 'Event namespace is required for socket events');
        return;
    } else if (!socket) {
        logger('error', 'Socket connection not available');
        return;
    } else if (typeof socket.on !== 'function') {
        logger('error', 'Socket connection is not valid');
        return;
    }

    // TODO: Build out the socket event handlers for card operations


    // Listen for card-related events
    socket.on(eventNamespace.SAVE_CARD, (data) => {
        logger('info', 'Card saved:', data);
        // Handle card save logic here
        if (onCardSave) {
            onCardSave(data);
        }
    });
    socket.on(eventNamespace.MOVE_CARD, (data) => {
        logger('info', 'Card moved:', data);
        // Handle card move logic here
        if (onCardMove) {
            onCardMove(data);
        }
    });
    socket.on(eventNamespace.DELETE_CARD, (data) => {
        logger('info', 'Card deleted:', data);
        // Handle card delete logic here
        if (onCardDelete) {
            onCardDelete(data);
        }
    });
    socket.on(eventNamespace.ADD_CARD, (data) => {
        logger('info', 'Card added:', data);
        // Handle card add logic here, to be triggered from UI or other events
        if (onCardAdd) {
            onCardAdd(data);
        }
    });
    socket.on(eventNamespace.UPDATE_CARD, (data) => {
        logger('info', 'Card updated:', data);
        // Handle card update logic here
        if (onCardUpdate) {
            onCardUpdate(data);
        }
    });
    socket.on(eventNamespace.ADD_CARD, (data) => {
        logger('info', 'Card added:', data);
        // Handle card add logic here, to be triggered from UI or other events
    });
    // triggered when card is updated in column, or moved across columns
    socket.on(eventNamespace.UPDATE_CARD, (data) => {
        logger('info', 'Card updated:', data);
        // Handle card update logic here
    });

    // Cleanup socket listeners on unmount
    return () => {
        socket.off(eventNamespace.SAVE_CARD);
        socket.off(eventNamespace.MOVE_CARD);
        socket.off(eventNamespace.DELETE_CARD);
        socket.off(eventNamespace.ADD_CARD);
        socket.off(eventNamespace.UPDATE_CARD);
    };
};

export default createSocketEvents;