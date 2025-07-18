import { addValidationError } from "../../Card/generator/addValidationError";

/**
 * Validates data against a given JSON schema.
 * 
 * @param {Object} data - The data object to validate.
 * @param {Object} schema - The schema to validate against, following JSON Schema format.
 * @param {string[]} [schema.required] - List of required property names.
 * @param {Object} [schema.properties] - Schema properties object with validation rules.
 * 
 * @returns {Object} Validation results containing:
 *   - isValid {boolean} - Whether the data is valid against the schema
 *   - errors {string[]} - List of validation error messages
 *   - propertyResults {Object} - Detailed validation results for each property:
 *     - isDisplayable {boolean} - Whether the property should be displayed
 *     - isValid {boolean} - Whether the property meets validation criteria
 *     - error {string|null} - Error message if validation failed, null otherwise
 */
export const validateAgainstSchema = (data, schema) => {
    const results = {
        isValid: true,
        errors: [],
        propertyResults: {}
    };

    if (!data || typeof data !== 'object') {
        results.isValid = false;
        results.errors.push('Input data is not an object');
        return results;
    }

    // Check required fields
    if (schema.required?.length) {
        schema.required.forEach(field => {
            const isFieldValid = data[field] !== undefined && data[field] !== null && data[field] !== '';
            if (!isFieldValid) {
                addValidationError(
                    results,
                    field,
                    `${schema.properties[field]?.title || field} is required`
                );
                results.propertyResults[field] = {
                    isDisplayable: false,
                    isValid: false,
                    error: results.errors[results.errors.length - 1]
                };
            } else {
                results.propertyResults[field] = { isValid: true, error: null };
            }
        });
    }

    // Validate property types and constraints
    if (schema.properties) {
        Object.entries(schema.properties).forEach(([key, prop]) => {
            // TODO check if object contains child objects and iterate over its keys
            // Check for child objects
            if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
                const childResults = validateAgainstSchema(data[key], prop);
                results.isValid = results.isValid && childResults.isValid;
                results.errors.push(...childResults.errors);
                results.propertyResults[key] = childResults.propertyResults;
                return;
            }

            const isDisplayable = prop?.isDisplayable ?? false;

            if (!results.propertyResults[key]) {
                results.propertyResults[key] = {
                    // add all additional properties for key
                    ...prop,
                    isDisplayable,
                    isValid: true,
                    error: null
                };
            } else {
                results.propertyResults[key].isDisplayable = isDisplayable;
            }

            if (data[key] == null) return;

            // Type validation
            if (prop.type === 'string' && typeof data[key] !== 'string') {
                addValidationError(results, key, `${prop.title || key} must be a string`);
            } else if (prop.type === 'number' && typeof data[key] !== 'number') {
                addValidationError(results, key, `${prop.title || key} must be a number`);
            }

            // String constraints
            if (prop.type === 'string') {
                if (prop.minLength && data[key].length < prop.minLength) {
                    addValidationError(results, key, `${prop.title || key} must be at least ${prop.minLength} characters`);
                }
                if (prop.maxLength && data[key].length > prop.maxLength) {
                    addValidationError(results, key, `${prop.title || key} must not exceed ${prop.maxLength} characters`);
                }
                if (prop.pattern && !new RegExp(prop.pattern).test(data[key])) {
                    addValidationError(results, key, `${prop.title || key} has an invalid format`);
                }
            }

            // Number constraints
            if (prop.type === 'number') {
                if (prop.minimum !== undefined && data[key] < prop.minimum) {
                    addValidationError(results, key, `${prop.title || key} must be at least ${prop.minimum}`);
                }
                if (prop.maximum !== undefined && data[key] > prop.maximum) {
                    addValidationError(results, key, `${prop.title || key} must not exceed ${prop.maximum}`);
                }
            }
        });
    }

    return results;
};
