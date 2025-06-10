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
        containerStyle = {},
        containerClassName = '',
        labels = {
            records: 'Records:',
            resultsPerPage: 'Results per page:',
            page: 'Page',
            of: 'of'
        },
        // data to populate
        paginationData: {
            currentPage = 1,
            totalRecords = 0,
            totalPages = 1,
            pageLength = 10
        } = {}
    } = props;
    // showing records from N-P
    let currentPageListStart = ((currentPage - 1) * pageLength) + 1;
    let currentRecordList = currentPage * pageLength;

    if (currentRecordList > totalRecords) {
        currentRecordList = totalRecords;
    }

    // Handle case when there are no records
    if (totalRecords === 0) {
        currentPageListStart = 0;
        currentRecordList = 0;
    }
    const recordTotals = showResultCount && (
        <div className="record-totals">
            {labels.records} {currentPageListStart}-{currentRecordList} {labels.of} {totalRecords}
        </div>
    );

    const pageStatus = showPageStatus && (
        <div className="page-status">
            <span>{labels.resultsPerPage}</span> {pageLength}
        </div>
    );

    const currentPageSet = showCurrentPageSet
        ? (<div className="current-page-set" role="menu">{labels.page} {currentPage} {labels.of} {totalPages}</div>)
        : null;

    const defaultContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '0.875rem'
    };

    const mergedStyle = { ...defaultContainerStyle, ...containerStyle };

    return (
        <div className={`record-count-menu ${containerClassName}`} style={mergedStyle}>
            {recordTotals}
            {pageStatus}
            {currentPageSet}
        </div>
    );
};

export default RecordCountMenu;