
/**
 * Renders the header of a kanban column.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.headerTitle - The title displayed in the column header.
 * @param {number|string} props.headerCount - The count displayed in the column header.
 * @returns {JSX.Element} A div containing the column title and count.
 */
const ColumnHeader = ({ headerTitle, headerCount }) => {
    const header = (
        <div className="column-header">
            <span className="column-title">{headerTitle}</span>
            <span className="column-count" >{headerCount}</span>
        </div>
    );
    return header;
};

export default ColumnHeader;