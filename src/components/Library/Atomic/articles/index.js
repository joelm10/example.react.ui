import { Fragment, useEffect, useState } from 'react';

import Pagination from 'components/Library/Widgets/Pagination';
import LoadingWrapper from 'components/Library/Atomic/loaders';
import getDataFromArray from 'helpers/utils/arrays/getFromArray';
import getFromApi from 'services/network/api';
import ArticleFromFields from './ArticleFromFields';
import makeUniqueKeyStr from 'helpers/utils/string/makeUniqueKeyStr';
import logger from 'helpers/utils/logging';
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

    const { url, meta, articleLimit = 12, pageTitle } = props;
    const [articleContent, setApiContent] = useState(defaultState);
    // const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            let apiResponse = await getFromApi(url);
            // send full data to get parsed, then slice to get accurate pageSet
            const paginationConfig = {
                currentPage: 1,
                maxDisplayCount: articleLimit,
                totalRecords: apiResponse.length
            };
            // check for target node in response
            if (meta?.baseResponseKey && apiResponse[meta?.baseResponseKey]) {
                // if node exists, use it to get data
                apiResponse = apiResponse[meta.baseResponseKey];
            } else if (meta?.baseResponseKey && !apiResponse[meta.baseResponseKey]) {
                // if node does not exist, log error and return empty array
                logger('error', `Schema ${meta.baseResponseKey} not found in response for ${pageTitle} at ${url}`);
                apiResponse = [];
            }
            // verify response contains data in array at target level
            const isValidResponse = Array.isArray(apiResponse) && apiResponse.length > 0;

            // api response handling only. subsequent calls, will live in pagination namespace
            const currentPageData = isValidResponse
                ? getDataFromArray(apiResponse, paginationConfig.maxDisplayCount)
                : [];

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

        if (!url || !mounted) {
            setApiContent({
                isLoading: false,
                rawApi: [],
                content: [],
                pagination: {
                    currentPage: 1,
                    maxDisplayCount: articleLimit,
                    totalRecords: 0,
                    pageLength: articleLimit,
                }
            });
            return;
        } else {
            if (mounted) {
                fetchData();
            }
        }
    }, [articleLimit, pageTitle, url, meta]);

    const articleContentWrapper = articleContent?.content !== null && articleContent.content.length > 0
        ? articleContent.content?.map((item) => {
            const articleKey = makeUniqueKeyStr(`acr_${item[meta.heading]}`)
            let displayContent = item;
            // check if item is object, and get child object if needed
            if (typeof item !== 'object') {
                // TODO: BUILD FOR SPLIT OBJECTS where content is split across multiple fields
            }

            const articleBody = (
                <ArticleFromFields
                    key={articleKey}
                    article={displayContent}
                    lookupList={meta}
                />
            );
            return articleBody;
        })
        : (<div>{meta.errorState}</div>);

    const paginationProps = {
        callback: {
            moveTo: (target) => {
                const { rawApi, pagination } = articleContent;

                // calculate target from: 1) target page set AND 2) 
                const targetIndex = (target - 1) * articleLimit;
                // extract updated pageSet
                const updatedApiContent = getDataFromArray(rawApi, pagination.maxDisplayCount, targetIndex);

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

    const wrappedArticles = !articleContent.isLoading ? (
        <Fragment>
            <div className='row'>{articleContentWrapper}</div>
            <Pagination {...paginationProps} rootKey={'footer'} />
        </Fragment>
    ) : (
        <LoadingWrapper />)
    return wrappedArticles;
};

export default ArticleWrapper;
