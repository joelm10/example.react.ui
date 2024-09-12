/* eslint-disable no-console */
/**
 * Wrapper around console object
 * ref: https://developer.mozilla.org/en-US/docs/Web/API/console
 * @param {string} logType - logType of message.
 *  Available types are error, warn, info, log, debug, debug with trace
 * @param {string} msg - message to send to browser console
 */
const logger = (logType, msg) => {
    // Ensure never runs in production
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        if (!logType || !msg) {
            return null;
        }

        if (logType === 'err') {
            console.error(msg);
        } else if (logType === 'warn') {
            console.warn(msg);
        } else if (logType === 'info') {
            console.info(msg);
        } else if (logType === 'log') {
            console.log(msg);
        } else if (logType === 'debug') {
            console.debug(msg);
        } else if (logType === 'debugTrace') {
            console.debug(msg);
            console.trace(msg);
        }
    }
    return false;
};
/* eslint-enable no-console */

export default logger;
