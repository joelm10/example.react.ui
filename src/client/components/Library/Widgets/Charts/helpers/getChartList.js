import { defaultChartList } from "../config/defaultChartList";
/**
 *  Get a sorted list of chart types
 *  This is used to generate the UI for the chart type selector
 *  and to provide a list of available chart types.
 * @function getChartList
 * @description Returns a sorted list of chart types based on their titles.
 *              

/**
 * 
 * @returns {array} sorted list of chart types
 */
const getChartList = () => {
    return defaultChartList.sort((a, b) => a.title.localeCompare(b.title));
};

export default getChartList;