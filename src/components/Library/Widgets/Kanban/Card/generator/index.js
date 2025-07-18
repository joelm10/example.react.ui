import logger from "helpers/utils/logging";
import makeUniqueKeyStr from "helpers/utils/string/makeUniqueKeyStr";
/**
 * Generates markup for displaying card data based on validation against the schema
 */
const generateCardMarkup = (inputData, cardSchema) => {
    // Handle empty/missing input data
    if (!inputData || typeof inputData !== 'object') {
        logger('warn', 'Input data is not a valid object');
        return renderInvalidCard("Card data is not a valid object");
    };

    // Validate input data against schema
    let validationResults = validateAgainstSchema(inputData, cardSchema);
    if (!validationResults.isValid) {
        logger('warn', `Input data is not valid against the schema: ${JSON.stringify(validationResults.errors)}`);
        return renderInvalidCard("Card data does not conform to the schema:", validationResults.errors);
    }
    // order inputData based on schema ui.order
    const orderedKeys = cardSchema.ui?.order || Object.keys(cardSchema.properties || {});
    const orderedInputData = {};
    orderedKeys.forEach(key => {
        orderedInputData[key] = inputData[key];
    });
    validationResults = {
        ...validationResults,
        propertyResults: {
            ...orderedInputData,
            ...validationResults.propertyResults
        }
    }

    // Generate card content
    const cardClass = 'card-valid';
    const header = orderedInputData.summary ? (
        <span className="card-header" data-property="summary">
            <h2>{orderedInputData.summary}</h2>
        </span>
    ) : null;

    // Generate body content
    const body = Object.entries(validationResults.propertyResults || {})
        .map(([key, propertySchema]) => {
            const value = orderedInputData[key];
            const isDisplayable = propertySchema?.isDisplayable;
            const isPropertyValid = propertySchema?.isValid ?? true;
            const errorMessage = propertySchema?.error || '';
            const topLevelFields = isDisplayable && renderFields(key, value, propertySchema, errorMessage, isPropertyValid, false, '');
            // check if property is an object with child objects and iterate over its keys if it is
            if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                // should iterate, but retain references to child object
                return Object.entries(value).map(([subKey, subValue]) => {
                    if (subValue === null || subValue === undefined) {
                        return null; // Skip null or undefined values
                    }

                    const subPropertySchema = propertySchema[subKey];
                    const subIsDisplayable = subPropertySchema?.isDisplayable ?? true;
                    const subIsValid = subPropertySchema?.isValid ?? true;
                    const subErrorMessage = subPropertySchema?.error || '';

                    const nestedField = renderFields(subKey, subValue, subPropertySchema, subErrorMessage, subIsValid, true, key, value);
                    return subIsDisplayable && nestedField;
                });
            }
            return topLevelFields

        })
        .filter(Boolean);

    // Add footer with validation summary if there are errors
    const footer = !validationResults.isValid ? (
        <div className="card-footer">
            <div className="validation-summary">
                <p>Please correct the following issues:</p>
                <ul>
                    {validationResults.errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
            </div>
        </div>
    ) : null;

    // Return the complete card
    // TODO leverage makeKey function to generate unique keys
    if (!header && !body.length && !footer) {
        logger('warn', 'Card has no displayable content');
        return renderInvalidCard("Card has no displayable content");
    }
    return (
        <div
            className={`card-container ${cardClass}`}
            key={makeUniqueKeyStr(orderedInputData.id || 'card')}
        >
            {header}
            <div className="card-body">{body}</div>
            {footer}
        </div>
    );
};

const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }
    return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
};

/**
 * Renders fields for a Kanban card.
 * 
 * @param {string} key - The property key for the field.
 * @param {*} value - The value to be rendered.
 * @param {Object} propertySchema - Schema information about the property.
 * @param {string} propertySchema.type - The data type of the property.
 * @param {string} errorMessage - Error message to display if the field is invalid.
 * @param {boolean} isPropertyValid - Whether the property is valid.
 * @param {boolean} isNested - Whether the field is nested within another field.
 * @returns {JSX.Element} A div containing the rendered field with appropriate styling.
 */
const renderFields = (key, value, propertySchema, errorMessage, isPropertyValid, isNested, parentKey, parentValue) => {
    // TODO: Add button click event handlers
    const fieldClass = isPropertyValid ? '' : 'field-invalid';
    const fieldErrorClass = errorMessage ? 'field-error' : '';
    const fieldKey = isNested ? `${parentKey}-${key}` : key;
    const fieldType = propertySchema?.displayType || propertySchema.type;
    let renderField = null;
    const formattedValue = formatValue(value, propertySchema?.type);
    // TODO: build out content handlers based on displayType
    if (fieldType === 'image') {
        if (!value || typeof value !== 'string') {
            const letters = getInitials(parentValue?.name);
            renderField = (
                <span className="field-value initials" title={parentValue.name}>
                    {letters}
                </span>
            );
        } else {
            renderField = (<img src={value} alt={key} className={`field-${fieldKey}`} />);
        }
    } else if (fieldType === 'icons') {
        // console.log('ICON->fieldType', fieldType, 'value', value);
        renderField = (
            <span className={`icon field-${fieldKey}`}>
                <i className={`icon-${value.toLowerCase()}`} />
                {value}ICON
            </span>
        );
    } else if (fieldType === 'badge') {
        // console.log('BADGE->fieldType', fieldType, 'value', value);
        renderField = (
            <span className={`badge badge-${value.toLowerCase()}`}>
                {value}
            </span>
        );
    } else if (fieldType === 'epic') {
        // TODO: consider schema specific type handlers, eg: epic handler
        renderField = (
            <span className={`epic epic-${value.toLowerCase()}`}>
                {value}
            </span>
        );
    } else {
        renderField = (
            <div
                className={`field-value field-${fieldKey} ${fieldClass} ${fieldErrorClass}`}
                title={formattedValue}>
                {formattedValue}
            </div>
        );
    }

    const renderedFields = (
        <div
            key={fieldKey}
            className={`field-value ${fieldKey}`}
            data-property={fieldKey}
            data-is-nested={isNested}
            data-type={propertySchema?.type}
            title={formattedValue}
        >
            {renderField}
            {errorMessage && <div className="field-error-message">{errorMessage}</div>}
        </div>
    );
    return renderedFields;
};

/**
 * Renders an invalid card with error messages
 */
const renderInvalidCard = (message, errors = []) => (
    <div className="card-invalid">
        <div className="card-header">
            <h2>Invalid Card</h2>
        </div>
        <div className="card-body">
            <p>{message}</p>
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
            )}
        </div>
    </div>
);

/**
 * Validates input data against a schema
 */
const validateAgainstSchema = (data, schema) => {
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

/**
 * Helper function to add validation errors
 */
const addValidationError = (results, field, errorMessage) => {
    results.isValid = false;
    results.errors.push(errorMessage);

    results.propertyResults[field] = results.propertyResults[field] || {};
    results.propertyResults[field].isValid = false;
    results.propertyResults[field].error = errorMessage;
};

/**
 * Format value based on type
 */
const formatValue = (value, type) => {
    if (value == null) {
        return <span className="empty-value">Value Not provided</span>;
    }

    switch (type) {
        case 'string': return value;
        case 'number':
        case 'integer': return typeof value === 'number' ? value.toString() : '0';
        case 'boolean': return value ? 'Yes' : 'No';
        case 'array': return Array.isArray(value) ? value.join(', ') : value;
        case 'object': return JSON.stringify(value);
        default: return String(value);
    }
};

export default generateCardMarkup;