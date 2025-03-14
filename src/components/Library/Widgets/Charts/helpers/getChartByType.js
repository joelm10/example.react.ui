
import { defaultChartList } from '../config/defaultChartList';

// TODO: remove mock data for non-dev
import { mockBubbleData, mockData, mockScatterData } from '../config/mockData';
// TODO: END

export const getChartByType = (chartType, chartProps) => {

    let ChartWrapper = defaultChartList.find((obj) => {
        return obj.title === chartType
    })?.component ?? null;

    if (!!ChartWrapper) {
        const generatedChartProps = generatePropsForChart(chartType, chartProps);
        ChartWrapper = (
            <ChartWrapper {...generatedChartProps} />
        );
    }
    return ChartWrapper;
};

/**
 * Composes props to pass to chards component, based on chart type
 * compute props object based on chart Type
 * @param {string} chartType 
 * @param {object} baseProps 
 * @returns 
 */
export const generatePropsForChart = (chartType, baseProps) => {
    if(!baseProps) {
        return {};
    }
    // TODO: Refactor to be more clear
    const isDev = process.env.NODE_ENV === 'development';

    const defaultDataConfig = {
        datasets: [],
        labels: []
    };
    // TODO: TURN ON FOR DEV ONLY & refactor more cleanly
    const devData = isDev ? mockData : {
        datasets: [],
        labels: []
    };

    let composedData = {
        ...devData,
        ...baseProps.data,
    };

    // TODO: Build data transformer OR early return if not in expected format/structure
    // TODO: refactor to ensure chartData is in structure expected by chart - to avoid throwing an error
    if (baseProps.type === 'bubble') {
        composedData = isDev ? mockBubbleData : composedData;
    } else if (baseProps.type === 'scatter') {
        composedData = isDev ? mockScatterData : composedData;
    }

    const defaultOptions = defaultChartList.find((item) => {
        return item.title === chartType && item.defaultOptions;
    })?.defaultOptions;

    const newOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: baseProps?.title
            },
        },
        ...defaultOptions
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