import ImageLoader from '../../images/imageLoader';
import makeUniqueKeyStr from 'helpers/utils/string/makeUniqueKeyStr';

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

    const title = article[lookupList?.heading];
    // TODO: increase functionality to break apart body object into formatable objects
    const bodyContent = article[lookupList?.content];
    const footerContent = article[lookupList?.footer];

    let imgContent = null;
    const hasImgThumbContent = article[lookupList?.imgThumbPath];
    const hasImgContent = article[lookupList?.imgPath];

    if (!!hasImgContent) {
        const imgProps = {
            imgType: '',
            imgPath: hasImgThumbContent,
            altText: title,
            // TODO: Add correct class for display
            width: '30',
            height: '30',
            // imgClass: ''
        }
        imgContent = <ImageLoader {...imgProps} />;
    }
    const articleKey = makeUniqueKeyStr(title);

    return (
        <div
            key={articleKey}
            className="col-4"
        >
            {!!title && (
                <h2
                    className='article--heading'
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
            {imgContent}
            {!!footerContent && (
                <div
                    role='contentinfo'
                    className=''
                >
                    {footerContent}
                </div>
            )
            }
        </div >
    );
};

export default ArticleFromFields;