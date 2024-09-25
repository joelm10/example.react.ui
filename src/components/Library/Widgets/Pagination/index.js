import { Fragment } from "react";
/**
 * 
 * @param {object} props 
 * @param {number} props.currentPage  
 * @param {number} props.totalRecords - total records 
 * @param {number} props.maxDisplayCount - total records to show per page
 */
const Pagination = (props) => {
    const { currentPage, totalRecords, maxDisplayCount } = props;
    // Pagination logic
    const totalPages = Math.ceil(totalRecords / maxDisplayCount);
    const startIndex = (currentPage - 1) * maxDisplayCount;
    const endIndex = startIndex + maxDisplayCount;

    const showPagination = endIndex >= totalPages;
    const showPageList = endIndex >= totalPages;
    
    // TODO: Build pagination control click events and callback objects
    // TODO: Limit max page numbers to display at once, AND add ...
    const pageListWrapper = Array.from({ length: totalPages }, (_, item) => {
        // TODO: Wire up callback to set page
        const activeClass = item + 1 === currentPage ? 'active' : '';
        const itemClass = `page-item ${activeClass}`;
        return (
            <li className={itemClass}>
                <span className="page-link">{item + 1}</span>
            </li>
        );
    });

    const pageList = showPageList
        ? (<div>Page {currentPage} of {totalPages}</div>)
        : null;

    const paginationWrapper = showPagination
        ? (<ul className='pagination'>{pageListWrapper}</ul>)
        : null;

    return <Fragment>
        {pageList}
        <b>TotalRecords:</b> {totalRecords}<br />
        {paginationWrapper}
    </Fragment>;
};

export default Pagination;