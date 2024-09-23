import verifyResponseBody from 'services/network/api/verifyResponseBody';

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
    });

    test('verifyResponseBody() should return valid, when JSON responseBody object passed', () => {
        const { valid, EXPECTED_OK } = mockValues;
        const recieved = verifyResponseBody(valid);
        expect(recieved).toEqual(EXPECTED_OK);
    });

    test('verifyResponseBody() should return when false, when omitHeaderCheck argument is passed responseBody object passed', () => {
        const { valid, EXPECTED_OK } = mockValues;
        const recieved = verifyResponseBody(valid, true);
        expect(recieved).toEqual(EXPECTED_OK);
        expect(recieved.isValidJson).toBe(false);
    })
});