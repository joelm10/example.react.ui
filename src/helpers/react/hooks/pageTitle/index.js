import { useEffect } from 'react';
import logger from 'helpers/utils/logging';

/**
 * Document title setter
 * @param {string} pageTitle
 */
const useSetPageTitle = (pageTitle) => {
    try {
        useEffect(() => {
            document.title = pageTitle;
        }, [pageTitle]);
    } catch (e) {
        logger('trace', `debugTrace() -> \n${e}`);
    }
};

export default useSetPageTitle;
