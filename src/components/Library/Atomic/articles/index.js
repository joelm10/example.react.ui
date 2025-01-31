import { Fragment, useEffect, useState } from 'react';

import Pagination from 'components/Library/Widgets/Pagination';
import getDataFromArray from 'helpers/utils/arrays/getFromArray';
import getFromApi from 'services/network/api';
import ArticleFromFields from './ArticleFromFields';
import makeUniqueKeyStr from 'helpers/utils/string/makeUniqueKeyStr';

/**
 * 
 * @param {object} props 
 * @returns 
 */
const ArticleWrapper = (props) => {
    const defaultState = {
        isLoading: true,
        content: null,
        pagination: {
            currentPage: 1,
            maxDisplayCount: 0,
            totalRecords: 0
        }
    };
    const { url, meta, articleLimit = 10, pageTitle } = props;
    const [articleContent, setApiContent] = useState(defaultState);

    useEffect(() => {
        // const { loading } = articleContent;
        let mounted = true;
        const fetchData = async () => {
            let apiResponse = await getFromApi(url);
            // send full data to get parsed, then slice to get accurate pageSet
            const paginationConfig = {
                currentPage: 1,
                maxDisplayCount: articleLimit,
                totalRecords: apiResponse.length
            };
            // api response handling only. subsequent calls, will live in pagination namespace
            const currentPageData = getDataFromArray(apiResponse, paginationConfig);

            setApiContent({
                isLoading: false,
                // cache full response
                rawApi: apiResponse,
                // parse full response for paging
                content: currentPageData,
                pagination: {
                    ...paginationConfig,
                    pageLength: articleLimit,
                }
            });
        };
        // TODO: replace with generic empty record component
        const noArticleFound = (<Fragment>No articles for {pageTitle}</Fragment>);

        if (!url || !mounted) {
            setApiContent(noArticleFound);
            return;
        } else {
            if (mounted) {
                fetchData();
            }
        }
    }, [articleLimit, pageTitle, url]);

    // TODO: refactor the limit handler below
    const articleContentWrapper = articleContent.content !== null
        ? articleContent.content?.map((item) => {
            const articleKey = makeUniqueKeyStr(item?.title)
            const articleBody = (
            <ArticleFromFields
                key={articleKey} 
                article={item}
                lookupList={meta} 
        
            />);
            return articleBody;
        })
        : null;

    const paginationProps = {
        callback: {
            moveTo: (target) => {
                const { rawApi, pagination } = articleContent;

                // calculate target from: 1) target page set AND 2) 
                const targetIndex = (target -1 ) * articleLimit;
                // extract updated pageSet
                const updatedApiContent = getDataFromArray(rawApi, pagination, targetIndex);

                const updatedContent = {
                    ...articleContent,
                    pagination: {
                        ...articleContent.pagination,
                        currentPage: target,
                    },
                    content: updatedApiContent
                };

                setApiContent(updatedContent);
            }
        },
        ...articleContent.pagination,
    };

    const pagination = <Pagination {...paginationProps} />

    const wrappedArticles = !articleContent.isLoading && (
        <Fragment>
            {pagination}
            {articleContentWrapper}
            {pagination}
        </Fragment>
    )
    return wrappedArticles;
};

export default ArticleWrapper;
