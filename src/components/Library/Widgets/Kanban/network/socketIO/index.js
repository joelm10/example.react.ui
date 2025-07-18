import io from 'socket.io-client';
import logger from 'helpers/utils/logging';
const socketWrapper = (config) => {
    // Initialize socket connection
    const { endPointUrl, options } = config;

    if (!endPointUrl) {
        logger('error', 'Socket endpoint URL is required');
        return null;
    }
    new URL(endPointUrl); // Validate URL format}
    const socket = io(endPointUrl, options);

    logger('info', 'socketWrapper initialized with URL:', endPointUrl);

    socket.on('connect', () => {
        logger('info', 'Socket connected:', socket.id);
    });
    socket.on('connect_error', (error) => {
        logger('error', 'Socket connection error:', error);
    })
        .on('reconnect', (attempt) => {
            logger('info', `Socket reconnected after ${attempt} attempts`);
        })
        .on('reconnect_error', (error) => {
            logger('error', 'Socket reconnection error:', error);
        });
    socket.on('reconnect_failed', () => {
        logger('error', 'Socket reconnection failed');
    });

    socket.on('disconnect', () => {
        logger('info', 'Socket disconnected');
    });
    if (!socket) {
        logger('error', 'Socket connection not available');
        return null;
    }
    return socket;
}

export default socketWrapper;