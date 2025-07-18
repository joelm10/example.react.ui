/**
 * Extracts initials from a person's name.
 * 
 * @param {string} name - The full name to extract initials from
 * @returns {string} The initials extracted from the name (empty string if no name provided)
 * 
 * @example
 * // returns 'J'
 * getInitials('John');
 * 
 * @example
 * // returns 'JD'
 * getInitials('John Doe');
 * 
 * @example
 * // returns ''
 * getInitials('');
 */
export const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }
    return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
};
