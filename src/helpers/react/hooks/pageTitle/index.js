import { useEffect } from "react";
import logger from '../../../utils/logging';

/**
 * Document title setter
 * @param {string} pageTitle 
 */
const SetPageTitle = ({ pageTitle = '' }) => {
    try {
        useEffect(() => {
            document.title = pageTitle
        }, [pageTitle]);
    } catch (e) {
        logger('trace', `debugTrace() -> \n${e}`);
    }
};

export default SetPageTitle;