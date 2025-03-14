import { render } from '@testing-library/react'
import { getChartByType } from "components/Library/Widgets/Charts/helpers/getChartByType";
// import { Doughnut, Bar, Pie, Line, PolarArea, Bubble, Radar } from 'react-chartjs-2';

const mockProps = {};

describe('components/Library/Widgets/Charts/helpers', () => {
    test('getChartByType() should return null when type not passed', () => {
        const received = getChartByType();

        expect(received).toBeNull();
    });

    test.skip('getChartByType() should return chart type as passed', () => {
        render(getChartByType('pie',mockProps));

        // expect(received).toEqual(Pie);
    });
});