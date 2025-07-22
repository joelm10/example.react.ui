import ImageLoader from '../../images/imageLoader';
import makeUniqueKeyStr from 'helpers/utils/string/makeUniqueKeyStr';
import ExpandableContent from '../ExpandableContent';
// context: extrapolate json fields to common display
/**
 * 
 * @param {object} props 
 * @param {object} article - json object with content 
 * @param {object} lookupList - enum object string values for matching 
 * @returns 
 */
const ArticleFromFields = ({ article, lookupList, options = {} }) => {
    if (!article || !lookupList) {
        return null;
    };

    const useFormatted = options?.useFormatted || false;
    const bodyContent = article[lookupList.content];
    const footerContent = article[lookupList?.footer];

    const keyLegend = bodyContent?.substring(0, 10) || null

    const articleKey = makeUniqueKeyStr(`aff_${keyLegend}`);
    const articleFormattedKey = makeUniqueKeyStr(`aff_formatted-${keyLegend}`);

    const title = article[lookupList?.heading];
    /**
     * Function to process bodyContent into formatable objects.
     * This is a placeholder implementation and should be enhanced further.
     * @param {string} bodyContent - The raw body content string.
     * @returns {Array} - Array of formatable objects.
     */
    const processBodyContent = (bodyContent) => {
        // Example: Split content by paragraphs
        return bodyContent?.split('\n').map((paragraph, index) => ({
            id: `paragraph_${index}`,
            content: paragraph.trim(),
        }));
    };



    // TODO: Consider moving to own generator funtions file
    const rawFormattedBodyContent = useFormatted && processBodyContent(article[lookupList?.content]);
    const formattedBodyContent = useFormatted && rawFormattedBodyContent?.map((item) => {
        const { content, id } = item;
        return (
            <div
                className="article--body"
                role='article'
                aria-labelledby={articleFormattedKey}
                aria-describedby={`${articleFormattedKey}-body`}
                id={`${articleFormattedKey}-body-formatted`}
                title={title}
                aria-label={title}
            >
                <p className="article--body-formatted" key={id}>
                    {content}
                </p>
            </div>);
    });

    const rawArticleBodyContent = !useFormatted
        ? (
            <div
                className="article--body--content"
                role='article'
                aria-labelledby={articleKey}
                aria-describedby={`${articleKey}-body`}
                id={`${articleKey}-body`}

            >
                <ExpandableContent {...{
                    content: bodyContent,
                    summaryLength: 150,
                    expandText: "Show more",
                    collapseText: "Show less"
                }}
                aria-label={title}
                aria-labelledby={articleKey}
                aria-describedby={`${articleKey}-body`}
                title={title}
                />
            </div>
        )
        : null;

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
            {formattedBodyContent}
            {rawArticleBodyContent}
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
        </div>
    );
};

export default ArticleFromFields;