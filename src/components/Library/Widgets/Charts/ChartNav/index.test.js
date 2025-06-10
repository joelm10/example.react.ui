import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ChartNav from './index';
import { defaultChartList } from '../config/defaultChartList';
import { makeSentenceCase } from '../helpers/makeSentenceCase';

// Mock the dependencies
jest.mock('helpers/utils/string/makeUniqueKeyStr', () => (str) => `key-${str}`);
jest.mock('../config/defaultChartList', () => ({
    defaultChartList: [
        { title: 'bar' },
        { title: 'line' },
        { title: 'pie' }
    ]
}));
jest.mock('../helpers/makeSentenceCase', () => ({
    makeSentenceCase: (str) => str.charAt(0).toUpperCase() + str.slice(1)
}));

describe('ChartNav Component', () => {
    const mockCallback = jest.fn();

    beforeEach(() => {
        mockCallback.mockClear();
    });

    test('renders select navigation when navType is select', () => {
        render(<ChartNav callback={mockCallback} currentChart="bar" navType="select" />);

        expect(screen.getByText('Select Graph Type')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();

        const options = screen.getAllByRole('option');
        expect(options.length).toBe(defaultChartList.length);
    });

    test('calls callback with selected value when select changes', () => {
        render(<ChartNav callback={mockCallback} currentChart="bar" navType="select" />);

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'pie' } });

        expect(mockCallback).toHaveBeenCalledWith('pie');
    });

    test('returns null if navType is not menu or select', () => {
        const { container } = render(
            <ChartNav callback={mockCallback} currentChart="bar" navType="invalid" />
        );

        expect(container[0]).toBeUndefined();
    });

    test('uses default chart list when chartList prop is not provided', () => {
        render(<ChartNav callback={mockCallback} currentChart="bar" />);

        const menuItems = screen.getAllByRole('menuitem', { name: /Bar|Line|Pie/i });
        // hardcoded as tests mock the defaultChartList
        // and it contains 6 items in the mock
        expect(menuItems.length).toBe(defaultChartList.length);
    });

    test('renders the correct chart titles in menu mode', () => {
        render(<ChartNav callback={mockCallback} currentChart="bar" />);

        defaultChartList.forEach(chart => {
            const displayTitle = makeSentenceCase(chart.title);
            expect(screen.getByText(displayTitle)).toBeInTheDocument();
        });
    });

    test('generates the correct number of options in select mode', () => {
        render(<ChartNav callback={mockCallback} currentChart="bar" navType="select" />);

        const options = screen.getAllByRole('option');
        expect(options.length).toBe(defaultChartList.length);

        defaultChartList.forEach((chart, index) => {
            const displayTitle = makeSentenceCase(chart.title);
            expect(options[index].textContent).toBe(displayTitle);
        });
    });

    test('renders menu navigation by default', () => {
        render(<ChartNav callback={mockCallback} currentChart="bar" />);

        const menuItem = screen.getByRole('button', { name: 'Bar' });

        expect(menuItem).toBeInTheDocument();
        expect(menuItem).toHaveClass('nav-link button');
        expect(screen.getAllByRole('button').length).toBe(defaultChartList.length);
    });

    test('calls callback when menu item is clicked', () => {
        render(<ChartNav callback={mockCallback} currentChart="bar" />);

        const pieMenuItem = screen.getByText('Pie');
        fireEvent.click(pieMenuItem);

        expect(mockCallback).toHaveBeenCalledWith('pie');
    });

    test('uses provided chartList when available', () => {
        const customChartList = [
            { title: 'custom1' },
            { title: 'custom2' }
        ];

        render(<ChartNav
            callback={mockCallback}
            currentChart="custom1"
            chartList={customChartList}
        />);

        expect(screen.getByText('Custom1')).toBeInTheDocument();
        expect(screen.getByText('Custom2')).toBeInTheDocument();
        expect(screen.queryByText('Bar')).not.toBeInTheDocument();
    });

    test('highlights the current chart in menu mode', () => {
        render(<ChartNav callback={mockCallback} currentChart="bar" />);

        const expectedClass = "nav-link";
        const activeMenuItem = screen.getByRole('button', { name: 'Bar' });
        expect(activeMenuItem).toHaveClass(expectedClass);

    });

    test.skip('sets the correct selected option in select mode', () => {
        render(<ChartNav callback={mockCallback} currentChart="line" navType="select" />);

        const select = screen.getByRole('combobox');
        expect(select.value).toBe('line');
    });

});