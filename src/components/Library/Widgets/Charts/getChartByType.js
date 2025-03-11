
import { Doughnut, Bar, Pie, Line, PolarArea, Bubble } from 'react-chartjs-2';

import { mockBubbleData, mockData, mockGeneralData } from './config/mockData';

export const getChartByType = (chartType, chartProps) => {
    const chartList = {
        donut: Doughnut,
        bar: Bar,
        pie: Pie,
        line: Line,
        polarArea: PolarArea,
        bubble: Bubble
    };

    let ChartWrapper = chartList[chartType] ?? null;

    if (!!ChartWrapper) {
        const generatedChartProps = generatePropsForChart(chartType, chartProps);
        ChartWrapper = (
            <ChartWrapper {...generatedChartProps} />
        );
    }
    return ChartWrapper;
};

// compute props object based on chart Type
const generatePropsForChart = (chartType, baseProps) => {
    const defaultDataConfig = {
        // labels: [],
        // datasets: []
    };

    // TODO: TURN ON FOR DEV ONLY
    let composedData = {
        ...mockData,
        ...baseProps.data,
    };

    if (baseProps.type === 'bubble') {
        // TODO: Build data transformer OR early return if not in expected format/structure
        composedData = mockBubbleData;
    }

    const newOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                // TODO: get from config
                text: 'Chart.js Bar Chart',
            },
        }
    };

    // TODO: extract and extrapolate chart types and required values
    const generatedProps = {
        ...defaultDataConfig,
        data: {
            ...composedData
        },
        options: {
            ...baseProps.options,
            ...newOptions
        }
    };

    return generatedProps;
};