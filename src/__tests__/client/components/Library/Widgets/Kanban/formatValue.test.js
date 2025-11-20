import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { formatValue } from 'client/components/Library/Widgets/Kanban/helpers/validators/formatValue';


describe('formatValue', () => {
    test('formats null values as a React element', () => {
        const result = formatValue(null, 'string');
        expect(React.isValidElement(result)).toBe(true);

        render(result);
        expect(screen.getByText('Value Not provided')).toBeInTheDocument();
    });

    test('formats undefined values as a React element', () => {
        const result = formatValue(undefined, 'string');
        expect(React.isValidElement(result)).toBe(true);

        render(result);
        expect(screen.getByText('Value Not provided')).toBeInTheDocument();
    });

    test('formats string values', () => {
        expect(formatValue('test', 'string')).toBe('test');
        expect(formatValue('', 'string')).toBe('');
    });

    test('formats number values', () => {
        expect(formatValue(123, 'number')).toBe('123');
        expect(formatValue(0, 'number')).toBe('0');
        expect(formatValue(3.14, 'number')).toBe('3.14');
        expect(formatValue('not a number', 'number')).toBe('0');
    });

    test('formats integer values', () => {
        expect(formatValue(123, 'integer')).toBe('123');
        expect(formatValue(0, 'integer')).toBe('0');
        expect(formatValue('not an integer', 'integer')).toBe('0');
    });

    test('formats boolean values', () => {
        expect(formatValue(true, 'boolean')).toBe('Yes');
        expect(formatValue(false, 'boolean')).toBe('No');
        expect(formatValue(1, 'boolean')).toBe('Yes');
        expect(formatValue(0, 'boolean')).toBe('No');
    });

    test('formats array values', () => {
        expect(formatValue([1, 2, 3], 'array')).toBe('1, 2, 3');
        expect(formatValue([], 'array')).toBe('');
        expect(formatValue('not an array', 'array')).toBe('not an array');
    });

    test('formats object values', () => {
        const obj = { a: 1, b: 2 };
        expect(formatValue(obj, 'object')).toBe(JSON.stringify(obj));
    });

    test('handles unknown types by converting to string', () => {
        expect(formatValue(123, 'unknown')).toBe('123');
        expect(formatValue(true, 'unknown')).toBe('true');
        expect(formatValue({ test: 'value' }, 'unknown')).toBe('[object Object]');
    });
});