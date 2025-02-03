import { Fragment } from "react";

/**
 * 
 * TODO: 1) add correct styling
 *       2) and support for positioning of child elements
 *       3) add config values for labels
 * @param {*} props 
 * @returns 
 */
const RecordCountMenu = (props) => {
    const {
        showResultCount = false,
        showPageStatus = false,
        showCurrentPageSet = false,
        // data to populate
        dataSet: {
            currentPage,
            totalRecords,
            totalPages,
            pageLength
        }
    } = props;

    //==

    // EG: SCENARIO:
    // - pageLength of 10
    // - Page 2
    // Should show: should be 11 - 20

    // showing records from N-P
    let currentPageListStart = currentPage;
    let currentRecordList = currentPage * pageLength;

    if (currentPage > 1) {
        currentPageListStart = currentPage * pageLength;
        currentRecordList = (currentPage * pageLength) + pageLength;
    }
    if (currentRecordList > totalRecords) {
        currentRecordList = totalRecords;
    }


    // TODO: add styles
    const recordTotals = showResultCount && (
        <div>
            {currentPageListStart}-{currentRecordList} of {totalRecords}<br />
        </div>
    );

    // TODO: add styles
    const pageStatus = showPageStatus && (
        <div>
            Results per page:
            {pageLength}
        </div>
    );
    const currentPageSet = showCurrentPageSet
        ? (<div role="menu">Page {currentPage} of {totalPages}</div>)
        : null;


    const recordCountMenu = (
        <Fragment>
            {recordTotals}
            {pageStatus}
            {currentPageSet}
        </Fragment>
    );
    return recordCountMenu;
};

export default RecordCountMenu;