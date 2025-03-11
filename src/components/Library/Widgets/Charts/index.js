/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState } from "react";

// Import, auto register
import 'chart.js/auto'

import { getChartByType } from './getChartByType';
import ChartNav from "./ChartNav";
import { defaultArgs } from "./config/defaultChartList";
// import { mockData } from "./config/mockData";

/**
 * Wrapper around react-chartJS-2
 * TODO: add change UI for switching charts
 * @param {*} props 
 */
const ChartWrapper = (props) => {
    const {
        chartType = 'pie',
        chartData,
        chartArgs = defaultArgs,
        chartOpts = {
        }

    } = props;
    const showNavUI = true;
    const [chartTypeToShow, setChartType] = useState(chartType);

    // draft composed props
    const chartProps = {
        type: chartTypeToShow,
        options: {
            // TODO: Build out generator for these, and/or 
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
                {showNavUI && <ChartNav callback={setChartType} />}
                {ChartWrapper}
            </Fragment>
        );
    };
};

export default ChartWrapper;
