/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState } from "react";

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
        showNavUI = 'true',
        chartType = 'bar',
        chartData,
        chartArgs = defaultArgs,
        chartOpts = {
            title: defaultArgs.title
        }
    } = props;


    const [chartTypeToShow, setChartType] = useState(chartType);

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
                {showNavUI && <ChartNav callback={setChartType} currentChart={chartTypeToShow} />}
                {ChartWrapper}
            </Fragment>
        );
    };
};

export default ChartWrapper;
