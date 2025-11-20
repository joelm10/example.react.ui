import { Fragment, useEffect, useState } from 'react';

import Pagination from 'client/components/Library/Widgets/Pagination';
import LoadingWrapper from 'client/components/Library/Atomic/loaders';
import getDataFromArray from 'client/helpers/utils/arrays/getFromArray';
import getFromApi from 'client/services/network/api';
import ArticleFromFields from './ArticleFromFields';
import makeUniqueKeyStr from 'client/helpers/utils/string/makeUniqueKeyStr';
import logger from 'client/helpers/utils/logging';
/**
 * 
 * @param {object} props 
 * @param {string} [props.paginationRootKey='footer'] - Key used for Pagination component's rootKey prop.
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
    console.log('ArticleWrapper props:', props);
    const { url, meta, articleLimit = 12, pageTitle, paginationRootKey = 'footer' } = props;
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
                totalRecords: apiResponse?.length ?? 0
            };
            // confirm apiResponse is NOT empty array;  
            // verify response contains data in array at target level
            const isValidResponse = Array.isArray(apiResponse) && apiResponse.length > 0;
            if (!isValidResponse) {
                logger('error', `Invalid API response for ${pageTitle} at ${url}`);
                setApiContent({
                    isLoading: false,
                    rawApi: [],
                    content: [],
                    pagination: {
                        ...paginationConfig,
                        totalRecords: 0,
                        pageLength: articleLimit,
                    }
                });
                return;
            }
            // check for target node in response
            if (meta?.baseResponseKey && apiResponse[meta?.baseResponseKey]) {
                // if node exists, use it to get data
                apiResponse = apiResponse[meta?.baseResponseKey];
            } else if (meta?.baseResponseKey && !apiResponse[meta?.baseResponseKey]) {
                // if node does not exist, log error and return empty array
                logger('error', `Schema ${meta?.baseResponseKey} not found in response for ${pageTitle} at ${url}`);
                apiResponse = [];
            }

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
            console.log('should have set content:', currentPageData);
        };

        if (!url || !mounted) {
            logger('info', 'No URL provided or component is unmounted, skipping API call.');
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
        : (<div className='article-wrapper'>{meta?.errorState}</div>);

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
    console.log('isLoading:', articleContent.isLoading);
    const wrappedArticles = !articleContent.isLoading ? (
        <Fragment>
            <div className='row'>{articleContentWrapper}</div>
            <Pagination {...paginationProps} rootKey={paginationRootKey} />
        </Fragment>
    ) : (
        <LoadingWrapper />);
    return wrappedArticles;
};

export default ArticleWrapper;
