import realFetch from 'node-fetch';
import camelcaseKeys from 'camelcase-keys';
import { buildApiUrl } from './buildApiUrl';
import verifyResponseBody from './verifyResponseBody';

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

    parsedData = camelcaseKeys(parsedData, { deep: true });

    return parsedData || data;

};

export default getFromApi;