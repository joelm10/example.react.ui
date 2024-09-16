/*
* logger
*/
import logger from '../../../../helpers/utils/logging';

const MOCK_LOG = {
    err: { msg: 'test error messsage' }
};

const consoleMockErr = jest.spyOn(console, 'error').mockImplementation();
const consoleMockWarn = jest.spyOn(console, 'warn').mockImplementation();
const consoleMockInfo = jest.spyOn(console, 'info').mockImplementation();
const consoleMockLog = jest.spyOn(console, 'log').mockImplementation();
const consoleMockDebug = jest.spyOn(console, 'debug').mockImplementation();

describe('helpers/utils', () => {
    test('->logger() should return null if no type or message sent', () => {
        const recieved = logger();
        expect(recieved).toBeNull();
    });

    test('->logger() should call error, if passed AND in dev or test mode', () => {
        const { err: { msg } } = MOCK_LOG;
        logger('err', msg);
        expect(consoleMockErr).toBeCalledWith(msg);
    });

    test('->logger() should call warn, if passed AND in dev or test mode', () => {
        const { err: { msg } } = MOCK_LOG;
        logger('warn', msg);
        expect(consoleMockWarn).toBeCalledWith(msg);
    });

    test('->logger() should call info, if passed AND in dev or test mode', () => {
        const { err: { msg } } = MOCK_LOG;
        logger('info', msg);
        expect(consoleMockInfo).toBeCalledWith(msg);
    });

    test('->logger() should call log, if passed AND in dev or test mode', () => {
        const { err: { msg } } = MOCK_LOG;
        logger('log', msg);
        expect(consoleMockLog).toBeCalledWith(msg);
    });
    test('->logger() should call log, if passed AND in debug mode', () => {
        const { err: { msg } } = MOCK_LOG;
        logger('debug', msg);
        expect(consoleMockDebug).toBeCalledWith(msg);
    });
});
