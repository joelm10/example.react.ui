import { Fragment } from 'react';

// context: extrapolate json fields to common display
const articleFromFields = (obj, lookupList) => {
    const {
        id: objKey
    } = obj;

    const title = obj[lookupList.heading];
    const body = obj[lookupList.content];
    const footer = obj[lookupList.footer];
    return (
        <Fragment key={objKey}>
            <h2>{title}</h2>
            {body}
            {footer}
        </Fragment>
    );
};

export default articleFromFields;