// getFromApi
import getFromApi from "services/network/api";
import verifyResponseBody from 'services/network/api/verifyResponseBody';

jest.mock('services/network/api/verifyResponseBody');

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve()
}));

const MOCK_VALUES = {
    responses: {
        isValid: {
            isStatusValid: true,
            isSuccessResponse: true,
            isValidJson: true,
            isErrorResponse: false
        },
        // JSON structure is valid from API
        isInvalidResponse: {
            isValidJson: true,
            isErrorResponse: true
        },
        isError: {

        },
        mockSuccessResponse: {
            // build out a mock?
        },
    }
};


describe('services/network/api/getFromApi()', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test.only('FAIL: should get API response', async () => {
        // todo: write failed api response testing
        const {
            responses: {
                isInvalidResponse
            }
        } = MOCK_VALUES;

        const fetchMock = jest
            .spyOn(global, 'fetch')
            .mockImplementationOnce(() => Promise.resolve({
                // assert child level in, as method adds this and transforms tableHeaders
                json: () => Promise.resolve(isInvalidResponse)
            }));

        // mock helper method verification
        verifyResponseBody.mockReturnValueOnce(isInvalidResponse);

        const recieved = await getFromApi('apiUrlHere.com', fetchMock);

        expect(recieved).toEqual(isInvalidResponse);
    });

    test('SUCCESS: should get API response', async () => {
        const {
            responses: {
                isValid,
                mockSuccessResponse
            }
        } = MOCK_VALUES;

        const fetchMock = jest
            .spyOn(global, 'fetch')
            .mockImplementationOnce(() => Promise.resolve({
                // assert child level in, as method adds this and transforms tableHeaders
                json: () => Promise.resolve(mockSuccessResponse)
            }));
        // mock helper method verification
        verifyResponseBody.mockReturnValueOnce(isValid);

        const recieved = await getFromApi('apiUrlHere.com', fetchMock);

        expect(recieved).toEqual(mockSuccessResponse);
    });

});