
import { Doughnut, Bar, Pie, Line, PolarArea, Bubble } from 'react-chartjs-2';

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
    const newOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        }
    };

    // TODO: extract and extrapolate chart types and required values
    const generatedProps = {
        ...baseProps,
        options: {
            ...baseProps.options,
            ...newOptions
        }
    };
    return generatedProps;
};