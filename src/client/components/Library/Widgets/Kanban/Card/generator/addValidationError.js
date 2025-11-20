/**
 * Helper function to add validation errors
 */

export const addValidationError = (results, field, errorMessage) => {
    results.isValid = false;
    results.errors.push(errorMessage);

    results.propertyResults[field] = results.propertyResults[field] || {};
    results.propertyResults[field].isValid = false;
    results.propertyResults[field].error = errorMessage;
};
