import { Fragment } from 'react';

// context: extrapolate json fields to common display
/**
 * 
 * @param {object} props 
 * @param {object} article - json object with contet 
 * @param {object} lookupList - enum object string values for matching 
 * @returns 
 */
const ArticleFromFields = ({ article, lookupList }) => {
    if (!article || !lookupList) {
        return null;
    }
    const {
        id: objKey
    } = article;

    const title = article[lookupList?.heading];
    // TODO: increase functionality to break apart body object into formatable objects
    const bodyContent = article[lookupList?.content];
    const footerContent = article[lookupList?.footer];

    return (
        <Fragment key={objKey}>
            {!!title && (
                <h2
                    className=''
                >
                    {title}
                </h2>
            )}
            {!!bodyContent && (
                <div
                    className=''
                >
                    {bodyContent}
                </div>
            )}
            {!!footerContent && (
                <div
                    className=''>
                    {footerContent}
                </div>
            )}
        </Fragment>
    );
};

export default ArticleFromFields;