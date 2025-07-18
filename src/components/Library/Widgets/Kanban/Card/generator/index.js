import logger from "helpers/utils/logging";
import makeUniqueKeyStr from "helpers/utils/string/makeUniqueKeyStr";
import { getInitials } from "../../helpers/string/getInitials";
import { validateAgainstSchema } from "../../helpers/validators/validateAgainstSchema";
import { formatValue } from "../../helpers/validators/formatValue";

/**
 * Generates React markup for a card component based on input data and schema.
 * 
 * @param {Object} inputData - The data to render in the card
 * @param {Object} cardSchema - Schema that defines the structure, validation rules, and display order
 * @returns {JSX.Element} React element representing the card
 * 
 * @description
 * This function generates a card with the following structure:
 * - Header: Contains the summary if available
 * - Body: Contains all displayable fields from the input data, ordered according to schema
 * - Footer: Contains validation errors if input data doesn't conform to schema
 * 
 * The function performs the following operations:
 * 1. Validates input data against the provided schema
 * 2. Orders the data according to schema's UI order preference
 * 3. Generates the card header from the summary field if available
 * 4. Generates the card body by rendering each field, handling nested objects
 * 5. Adds a footer with validation errors if any exist
 * 6. Returns a complete card component with appropriate styling
 * 
 * @throws Returns an invalid card component if input data is missing, invalid, or has no displayable content
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
            renderField = (
                <img
                    src={value}
                    alt={parentValue.name}
                    className={`field-${fieldKey}`}
                />
            );
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

    const renderErrorContent = errorMessage && (<div className="field-error-message">{errorMessage}</div>);
    const renderedFields = (
        <div
            key={fieldKey}
            className={`field-value ${fieldKey}`}
            data-property={fieldKey}
            data-is-nested={isNested}
            data-type={propertySchema?.type}
            title={parentValue?.name || formattedValue}
        >
            {renderField}
            {renderErrorContent}
        </div>
    );
    return renderedFields;
};

/**
 * Renders an invalid card component with an error message and optional error list.
 * 
 * @param {string} message - The main error message to display in the card.
 * @param {Array<string>} [errors=[]] - Optional array of error messages to display as a list.
 * @returns {JSX.Element} A React element representing the invalid card.
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

export default generateCardMarkup;