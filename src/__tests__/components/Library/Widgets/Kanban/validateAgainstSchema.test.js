import { validateAgainstSchema } from 'client/components/Library/Widgets/Kanban/helpers/validators/validateAgainstSchema';
// import { addValidationError } from "client/components/Library/Widgets/Kanban/Card/generator/addValidationError";

// Mock the dependency
jest.mock("client/components/Library/Widgets/Kanban/Card/generator/addValidationError", () => ({
    addValidationError: jest.fn((results, field, message) => {
        results.isValid = false;
        results.errors.push(message);
        if (results.propertyResults[field]) {
            results.propertyResults[field].isValid = false;
            results.propertyResults[field].error = message;
        }
    })
}));

describe('validateAgainstSchema', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return error for non-object data', () => {
        const result = validateAgainstSchema(null, {});
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Input data is not an object');
    });

    test('should validate required fields', () => {
        const schema = {
            required: ['name', 'email'],
            properties: {
                name: { title: 'Name' },
                email: { title: 'Email Address' }
            }
        };

        const validData = { name: 'John', email: 'john@example.com' };
        const invalidData = { name: 'John' };

        const validResult = validateAgainstSchema(validData, schema);
        expect(validResult.isValid).toBe(true);
        expect(validResult.errors).toHaveLength(0);

        const invalidResult = validateAgainstSchema(invalidData, schema);
        expect(invalidResult.isValid).toBe(false);
        expect(invalidResult.errors).toContain('Email Address is required');
    });

    test('should validate string type and constraints', () => {
        const schema = {
            properties: {
                username: {
                    type: 'string',
                    title: 'Username',
                    minLength: 3,
                    maxLength: 10,
                    pattern: '^[a-zA-Z0-9]+$'
                }
            }
        };

        // Valid string
        const validResult = validateAgainstSchema({ username: 'user123' }, schema);
        expect(validResult.isValid).toBe(true);

        // Wrong type
        const wrongTypeResult = validateAgainstSchema({ username: 123 }, schema);
        expect(wrongTypeResult.isValid).toBe(false);
        expect(wrongTypeResult.errors).toContain('Username must be a string');

        // Too short
        const tooShortResult = validateAgainstSchema({ username: 'ab' }, schema);
        expect(tooShortResult.isValid).toBe(false);
        expect(tooShortResult.errors).toContain('Username must be at least 3 characters');

        // Too long
        const tooLongResult = validateAgainstSchema({ username: '12345678901' }, schema);
        expect(tooLongResult.isValid).toBe(false);
        expect(tooLongResult.errors).toContain('Username must not exceed 10 characters');

        // Invalid format
        const invalidFormatResult = validateAgainstSchema({ username: 'user@123' }, schema);
        expect(invalidFormatResult.isValid).toBe(false);
        expect(invalidFormatResult.errors).toContain('Username has an invalid format');
    });

    test('should validate number type and constraints', () => {
        const schema = {
            properties: {
                age: {
                    type: 'number',
                    title: 'Age',
                    minimum: 18,
                    maximum: 99
                }
            }
        };

        // Valid number
        const validResult = validateAgainstSchema({ age: 25 }, schema);
        expect(validResult.isValid).toBe(true);

        // Wrong type
        const wrongTypeResult = validateAgainstSchema({ age: '25' }, schema);
        expect(wrongTypeResult.isValid).toBe(false);
        expect(wrongTypeResult.errors).toContain('Age must be a number');

        // Too small
        const tooSmallResult = validateAgainstSchema({ age: 16 }, schema);
        expect(tooSmallResult.isValid).toBe(false);
        expect(tooSmallResult.errors).toContain('Age must be at least 18');

        // Too large
        const tooLargeResult = validateAgainstSchema({ age: 100 }, schema);
        expect(tooLargeResult.isValid).toBe(false);
        expect(tooLargeResult.errors).toContain('Age must not exceed 99');
    });

    test('should properly set isDisplayable property', () => {
        const schema = {
            properties: {
                visible: { isDisplayable: true },
                hidden: { isDisplayable: false },
                defaultHidden: {} // Should default to false
            }
        };

        const result = validateAgainstSchema({ visible: 'data', hidden: 'data', defaultHidden: 'data' }, schema);

        expect(result.propertyResults.visible.isDisplayable).toBe(true);
        expect(result.propertyResults.hidden.isDisplayable).toBe(false);
        expect(result.propertyResults.defaultHidden.isDisplayable).toBe(false);
    });

    test('should handle nested objects', () => {
        const schema = {
            properties: {
                person: {
                    properties: {
                        name: { type: 'string' },
                        age: { type: 'number', minimum: 0 }
                    },
                    required: ['name']
                }
            }
        };

        // Valid nested object
        const validData = {
            person: {
                name: 'Jane',
                age: 30
            }
        };

        const validResult = validateAgainstSchema(validData, schema);
        expect(validResult.isValid).toBe(true);

        // Invalid nested object (missing required field)
        const invalidData = {
            person: {
                age: 30
            }
        };

        const invalidResult = validateAgainstSchema(invalidData, schema);
        expect(invalidResult.isValid).toBe(false);
    });

    test.only('should handle null values in data', () => {
        const schema = {
            properties: {
                optionalField: { type: 'string' }
            }
        };

        const result = validateAgainstSchema({ optionalField: null }, schema);

        expect(result.isValid).toBe(false);
        expect(result.propertyResults.optionalField.isValid).toBe(undefined);
    });
});