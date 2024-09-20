import { Fragment, useEffect, useState } from 'react';

import getFromApi from '../../../../services/network/api';
import articleFromFields from './getFromJson';


/**
 * 
 * @param {object} props 
 * @returns 
 */
const ArticleWrapper = (props) => {
    const { url, meta, articleLimit = 10, pageTitle } = props;
    const [articleContent, setApiContent] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            let apiResponse = await getFromApi(url);

            const formattedResponse = apiResponse
                // TODO: refactor the limit handler below
                ? apiResponse.slice(0, articleLimit).map((item) => {
                    const articleBody = articleFromFields(item, meta);
                    return articleBody;
                })
                : noArticleFound

            setApiContent(formattedResponse);
        };
        const noArticleFound = (<Fragment>No articles for {pageTitle}</Fragment>);

        if (!url) {
            setApiContent(noArticleFound);
            return;
        } else {
            fetchData();
        }
    }, [url, articleLimit, meta, pageTitle]);

    return articleContent;
};

export default ArticleWrapper;