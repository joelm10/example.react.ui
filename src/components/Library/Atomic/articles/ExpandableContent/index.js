import { useState } from 'react';

/**
 * Component to show a summary of content with a toggle to expand.
 * 
 * @param {object} props
 * @param {string} props.content - The full content to display
 * @param {number} props.summaryLength - Maximum characters to show in summary
 * @param {string} props.expandText - Text for the expand button
 * @param {string} props.collapseText - Text for the collapse button
 * @returns {JSX.Element} - A component with expandable content
 */
const ExpandableContent = ({
    content,
    summaryLength = 150,
    expandText = "Show more",
    collapseText = "Show less"
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!content) return null;

    const needsExpansion = content.length > summaryLength;

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="expandable-content">
            <div className="content-text">
                {(!needsExpansion || isExpanded) ? (
                    content
                ) : (
                    <>
                        {content.substring(0, summaryLength)}
                        <span className="ellipsis">...</span>
                    </>
                )}
            </div>

            {needsExpansion && (
                <button
                    className="btn btn-link expand-toggle"
                    onClick={toggleExpand}
                    aria-expanded={isExpanded}
                >
                    {isExpanded ? collapseText : expandText}
                </button>
            )}
        </div>
    );
};
export default ExpandableContent;