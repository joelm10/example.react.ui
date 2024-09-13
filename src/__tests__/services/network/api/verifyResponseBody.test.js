import verifyResponseBody from '../../../../services/network/api/verifyResponseBody';

const myHeaders = new Headers();
myHeaders.append('Content-Type');

const mockValues = {
    valid: {
        headers: myHeaders,
        status: 200,
        ok: true
    },
    EXPECTED_OK: {
        isErrorResponse: false,
        isStatusValid: true,
        isSuccessResponse: true,
        isValidJson: false
    }
}

describe('/services/network/api', () => {
    test('verifyResponseBody() should return null when no responseBody object passed', () => {
        const recieved = verifyResponseBody();
        expect(recieved).toBeNull();
    })

    test.only('verifyResponseBody() should return when valid JSON responseBody object passed', () => {
        const { valid, EXPECTED_OK } = mockValues;
        const recieved = verifyResponseBody(valid);
        expect(recieved).toEqual(EXPECTED_OK);
    })
});