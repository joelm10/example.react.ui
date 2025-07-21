import { getInitials } from 'components/Library/Widgets/Kanban/helpers/string/getInitials';

describe('getInitials', () => {
    it('should return an empty string when no name is provided', () => {
        expect(getInitials()).toBe('');
        expect(getInitials('')).toBe('');
        expect(getInitials(null)).toBe('');
        expect(getInitials(undefined)).toBe('');
    });

    it('should return the first letter of a single name', () => {
        expect(getInitials('John')).toBe('J');
        expect(getInitials('mary')).toBe('M');
    });

    it('should return the first letters of first and last name', () => {
        expect(getInitials('John Doe')).toBe('JD');
        expect(getInitials('jane smith')).toBe('JS');
    });

    it('should only use the first two names when more than two names are provided', () => {
        expect(getInitials('John Doe Smith')).toBe('JD');
        expect(getInitials('Alice Bob Charlie')).toBe('AB');
    });

    it('should handle names with extra spaces', () => {
        // expect(getInitials('  John  Doe  ')).toBe('JD');
        expect(getInitials(' Robert ')).toBe('R');
    });
});