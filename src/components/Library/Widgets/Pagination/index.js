import { Fragment } from "react";
import './pagination.css';
import logger from "helpers/utils/logging";
import makeUniqueKeyStr from "helpers/utils/string/makeUniqueKeyStr";

/**
 * UI Pagination component
 * @param {object} props 
 * @param {number} props.currentPage  
 * @param {number} props.totalRecords - total records 
 * @param {number} props.maxDisplayCount - total records to show per page
 * @returns {React.Element} React.Element
 */
const Pagination = (props) => {
    const {
        currentPage, totalRecords, maxDisplayCount = 10,
        rootKey,
        callback: {
            moveTo = () => { }
        }
    } = props;

    if (!currentPage || !totalRecords || !maxDisplayCount) {
        return null;
    }
    // Pagination logic
    const totalPages = Math.ceil(totalRecords / maxDisplayCount);
    const startIndex = (currentPage - 1) * maxDisplayCount;
    const endIndex = startIndex + maxDisplayCount;
    const showPagination = totalRecords >= maxDisplayCount;
    const showPageList = endIndex >= totalPages;
    /**
     * Call functoiun passed via props, with error handler
     * @param {number} target 
     */
    const handleClick = (target) => {
        try {
            moveTo(target);
        } catch (e) {
            logger('err', `<Pagination /> -> handleClick()-> {e}`);
            logger('err', e);
        }
    };

    /**
     * Generate UI elements for Pagination
     * @param {string} itemKey 
     * @param {string} itemTitle 
     * @param {html} itemContent 
     * @param {string} itemClass 
     * @param {function} click 
     * @param {number} targetIndex 
     * @returns React.Element
     * TODO: Consider move to own file
     */
    const makePageItem = (itemKey, itemTitle, itemContent, itemClass, click, targetIndex) => {
        const item = (
            <li
                key={itemKey}
                className={itemClass}
                onClick={() => click(targetIndex)}
                title={itemTitle}
            >
                <span
                    key={`${itemKey}_span`}
                    className="page-link">
                    {itemContent}
                </span>
            </li>
        );
        return item;
    };
    const pageListWrapper = [];
    const numberArray = Array.from({ length: totalPages });
    showPagination && numberArray.map((_, item) => {
        // Handle 0 index for display and referential use
        const targetIndex = item + 1;
        const itemTitle = targetIndex;
        const baseClass = 'page-item';
        const activeClass = targetIndex === currentPage
            ? 'active'
            : '';
        const itemClass = `${baseClass} ${activeClass}`;

        const itemKey = makeUniqueKeyStr(`${rootKey}_paginateItem_${itemTitle}`);

        // handle bounds - functional AND presentation
        const isFirst = currentPage === 1;
        const isLast = currentPage === numberArray.length;
        const clickHandler = (target) => {
            // Add bounds for prev/next, first & last
            if (target === 0 || target === (numberArray.length - maxDisplayCount)) {
                return;
            }
            handleClick(target);
        };

        const firstClass = !isFirst ? baseClass : `${baseClass} disabled`;
        const lastClass = !isLast ? baseClass : `${baseClass} disabled`;
        // TODO: move to config
        const hintLabel = 'Go to';
        // UI prev/next elements
        const goFirstNav = item === 0
            && makePageItem(`${rootKey}_itemFirst`, `${hintLabel} First`, <Fragment>&lt; First</Fragment>, firstClass, clickHandler, targetIndex);
        const goLastNav = item === totalPages - 1
            && makePageItem(`${rootKey}_itemLast`, itemTitle, <Fragment>Last &gt;</Fragment>, lastClass, clickHandler, targetIndex);
        const prevNav = item === 0
            && makePageItem(`${rootKey}_itemPrev`, `${hintLabel} Previous`, <Fragment>&lt;</Fragment>, firstClass, clickHandler, currentPage - 1);
        const nextNav = item === totalPages - 1
            && makePageItem(`${rootKey}_itemNext`, `${hintLabel} Next`, <Fragment>&gt;</Fragment>, lastClass, clickHandler, currentPage + 1);
        const pagingationContent = makePageItem(`${rootKey}_${itemKey}`, itemTitle, itemTitle, itemClass, handleClick, targetIndex);

        if (item === 0) {
            pageListWrapper.push(goFirstNav, prevNav);
        } else if (item + 1 === maxDisplayCount) {
            pageListWrapper.push(nextNav, goLastNav);
        }
        pageListWrapper.push(pagingationContent);
        return null;
    });

    const pageList = showPageList
        ? (<div role="menu">Page {currentPage} of {totalPages}</div>)
        : null;

    const paginationWrapper = showPagination
        ? (
            <ul
                key='paginationWrapper'
                className='pagination'>
                {pageListWrapper}
            </ul>
        )
        : null;

    // TODO: Move hard coded labels/strings to config
    return showPagination && (
        <Fragment>
            {pageList}
            {showPagination && (
                <Fragment>
                    <b>Total Records:</b> {totalRecords}<br />
                </Fragment>
            )
            }
            {paginationWrapper}
        </Fragment>
    );
};

export default Pagination;