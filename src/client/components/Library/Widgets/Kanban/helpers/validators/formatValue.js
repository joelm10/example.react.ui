/**
 * Formats a value based on its type for display in UI components.
 * 
 * @param {*} value - The value to format
 * @param {string} type - The type of value to format ('string', 'number', 'integer', 'boolean', 'array', 'object')
 * @returns {string|JSX.Element} Formatted value as a string or React element
 * 
 * @example
 * // Returns "Yes" for boolean true
 * formatValue(true, 'boolean')
 * 
 * @example
 * // Returns a JSX element for null values
 * formatValue(null, 'string') // <span className="empty-value">Value Not provided</span>
 */
export const formatValue = (value, type) => {
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
