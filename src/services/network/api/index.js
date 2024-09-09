// import camelcaseKeys from 'camelcase-keys';
// TODO: Fix above import to run in tests, currenly fails
// err: ' SyntaxError: Cannot use import statement outside a module'
import realFetch from 'node-fetch';

import buildApiUrl from './buildApiUrl';
import verifyResponseBody from './verifyResponseBody';
const getOptions = {};

const getFromApi = async (url, fetch = realFetch) => {

    const composedUrl = buildApiUrl(url);

    const response = await fetch(composedUrl, getOptions);

    const isValidResponse = verifyResponseBody(response, true);
    const {
        isSuccessResponse
    } = isValidResponse;

    const data = isSuccessResponse && await response.json();

    let parsedData = (typeof data === 'string')
        ? JSON.parse(data)
        : data;
    // TODO: Verify import issue from camelcaseKeys npm module
    // parsedData = camelcaseKeys(parsedData, { deep: true });

    return parsedData || data;

};

export default getFromApi;