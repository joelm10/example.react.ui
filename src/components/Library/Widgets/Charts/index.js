/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

// Import, auto register
import 'chart.js/auto'

import { getChartByType } from './helpers/getChartByType';
import ChartNav from "./ChartNav";
import { defaultArgs } from "./config/defaultChartList";

/**
 * Wrapper around react-chartJS-2
 * @param {*} props 
 */
const ChartWrapper = (props) => {
    const {
        showNavUI = true, // ensure this is a boolean, not a string
        chartType = 'bar',
        chartData,
        chartArgs = defaultArgs,
        chartOpts = {
            title: defaultArgs.title
        }
    } = props;


    const [chartTypeToShow, setChartType] = useState(chartType);
    const navigate = useNavigate();

    const UpdateChartCallback = (newChartType) => {
        let basePath = '/chart'; // default base path for navigation
        // If using react-router, you can use the navigate function to change the URL
        if (newChartType.startsWith('/')) {
            basePath = '';
        }
        // check current type is not the same as new type
        if (newChartType === chartTypeToShow) {
            return;
        }
        // If using react-router, navigate to the new chart type
        navigate(`${basePath}/${newChartType}`);
        setChartType(newChartType);
    };

    // draft composed props.
    //  These are augmented/decorated in generatePropsForChart(), called by getChartByType() method
    const chartProps = {
        type: chartTypeToShow,
        options: {
            ...chartOpts
        },
        data: chartData,
        ...chartArgs
    };

    // get component, compose props as needed and return
    let ChartWrapper = getChartByType(chartTypeToShow, chartProps);

    if (!!ChartWrapper) {
        return (
            <Fragment>
                {showNavUI && <ChartNav callback={UpdateChartCallback} currentChart={chartTypeToShow} />}
                {ChartWrapper}
            </Fragment>
        );
    };

    // Explicitly return null if no ChartWrapper is found
    return null;
};

export default ChartWrapper;
