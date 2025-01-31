import { Fragment } from "react";
import './pagination.css';
import logger from "helpers/utils/logging";
import makeUniqueKeyStr from "helpers/utils/string/makeUniqueKeyStr";

/**
 * 
 * @param {object} props 
 * @param {number} props.currentPage  
 * @param {number} props.totalRecords - total records 
 * @param {number} props.maxDisplayCount - total records to show per page
 */
const Pagination = (props) => {
    const {
        currentPage, totalRecords, maxDisplayCount,
        callback: {
            moveTo = () => { }
        }
    } = props;

    // Pagination logic
    const totalPages = Math.ceil(totalRecords / maxDisplayCount);
    const startIndex = (currentPage - 1) * maxDisplayCount;
    const endIndex = startIndex + maxDisplayCount;

    const showPagination = endIndex >= totalPages;
    const showPageList = endIndex >= totalPages;

    // Build out or pass down from parent
    const handleClick = (target) => {
        try {
            moveTo(target);
        } catch (e) {
            logger('err', `<Pagination /> -> handleClick()-> {e}`);
            logger('err', e);
        }
    };

    // Generate UI elements for Pagination
    const makePageItem = (itemKey, itemTitle, itemContent, itemClass, click, targetIndex) => {
        // add handler for disabled
        const isDisabled = '';
        const clickHandler = () => {
            // add early return
            click(targetIndex);
        };

        const item = (
            <li
                key={itemKey}
                className={itemClass}
                onClick={() => clickHandler()}
                title={itemTitle}
            >
                <span className="page-link">
                    {itemContent}
                </span>
            </li>
        );
        return item;
    };

    // TODO: Limit max page numbers to display at once, AND add ...
    const numberArray = Array.from({ length: totalPages });

    const pageListWrapper = numberArray.map((_, item) => {
        // Handle 0 index for display and referential use
        const targetIndex = item + 1;
        const itemTitle = targetIndex;
        const baseClass = 'page-item';
        const activeClass = targetIndex === currentPage
            ? 'active'
            : '';
        const itemClass = `${baseClass} ${activeClass}`;
        const itemKey = makeUniqueKeyStr(`paginateItem_${itemTitle}`);
        // handle bounds - functional AND presentation
        const isFirst = currentPage === 1;
        const isLast = currentPage === numberArray.length;

        const clickHandler = (target) => {
            // if its first element, dont hit next.
            if (!isFirst) {
                console.log('should fire not first');
                handleClick(target);
                return;
            } else if (!isLast) {
                console.log('should fire not first');

                handleClick(target);
                return;
            }
            console.warn('should NOT fire');
        };
        
        const firstClass = !isFirst ? baseClass : `${baseClass} disabled`;
        const lastClass = !isLast ? baseClass : `${baseClass} disabled`;
        // TODO: Add bounds for prev/next, first & last
        // UI prev/next elements
        const goFirsttNav = item === 0 && makePageItem(`itemFirst`, itemTitle, <Fragment>&lt; First</Fragment>, firstClass, clickHandler, targetIndex);
        const goLastNav = item === totalPages - 1 && makePageItem('itemLast', itemTitle, <Fragment>Last &gt;</Fragment>, lastClass, clickHandler, targetIndex);

        const prevNav = item === 0 && makePageItem('itemPrev', itemTitle, <Fragment>&lt;</Fragment>, firstClass, clickHandler, currentPage - 1);
        const nextNav = item === totalPages - 1 && makePageItem('itemNext', itemTitle, <Fragment>&gt;</Fragment>, lastClass, clickHandler, currentPage + 1);

        const pagingationContent = makePageItem(itemKey, itemTitle, itemTitle, itemClass, handleClick, targetIndex);

        return (
            <Fragment>
                {goFirsttNav}
                {prevNav}
                {pagingationContent}
                {nextNav}
                {goLastNav}
            </Fragment>
        );
    });

    const pageList = showPageList
        ? (<div>Page {currentPage} of {totalPages}</div>)
        : null;

    const paginationWrapper = showPagination
        ? (
            <ul className='pagination'>
                {pageListWrapper}
            </ul>
        )
        : null;

    return <Fragment>
        {pageList}
        <b>TotalRecords:</b> {totalRecords}<br />
        {paginationWrapper}
    </Fragment>;
};

export default Pagination;