import { Fragment } from "react";

/**
 * 
 * TODO: 1) add correct styling
 *       2) Add support for positioning of child elements by allowing custom styles or class names to be passed via props.
 *          Example: 
 *          - Use `containerStyle` or `containerClassName` props to apply custom positioning styles.
 *          - Example usage:
 *              <RecordCountMenu containerStyle={{ display: 'flex', justifyContent: 'center' }} />
 *              or
 *              <RecordCountMenu containerClassName="custom-class" />
 * Inline styles: <div style={{ color: 'blue', fontSize: '14px' }}>Records:</div>
 * CSS classes: <div className="record-count-menu">Records:</div>
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
            Records:
            {currentPageListStart}-{currentRecordList} of {totalRecords}<br />
        </div>
    );

    // TODO: add styles
    const pageStatus = showPageStatus && (
        <div>
            <span>Results per page:</span>
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