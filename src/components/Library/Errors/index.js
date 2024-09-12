import { Fragment } from 'react';
import logger from '../../../helpers/utils/logging';
import { useLocation } from 'react-router-dom';
const ErrorComponent = (props) => {
    const { errHeading = 'Page not found' } = props;
    const location = useLocation();
    logger('debugTrace', location);

    const errMessage = `An error has occured, cant find page ${location.pathname}`;
    const errComponent = (
        <Fragment>
            <h1>{errHeading}</h1>
            <div>{errMessage}</div>
            <a href="/">Go home</a>
        </Fragment>
    );
    return errComponent;
};

export default ErrorComponent;