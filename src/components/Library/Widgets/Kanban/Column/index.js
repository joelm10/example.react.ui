import Card from '../Card';
import ColumnHeader from './Header';

/**
 * A component that represents a column in a Kanban board.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.column - The column data.
 * @param {string} props.column.id - The unique identifier for the column.
 * @param {string} props.column.title - The title of the column.
 * @param {Array<Object>} props.column.cards - An array of card objects in this column.
 * @param {Object} props.callbacks - Callbacks for drag and drop functionality.
 * @param {Function} props.callbacks.handleDragOver - Handler for when a dragged item is over the column.
 * @param {Function} props.callbacks.handleDrop - Handler for when a dragged item is dropped onto the column.
 * @param {Function} props.callbacks.handleDragStart - Handler for when a drag operation starts.
 * @param {Function} props.callbacks.handleDragEnd - Handler for when a drag operation ends.
 * @returns {JSX.Element} A column component with cards.
 */
const ColumnWrapper = (props) => {
    const { column, callbacks } = props;
    const { handleDragOver, handleDrop, handleDragStart, handleDragEnd } = callbacks;

    return (
        <div
            className="kanban-column"
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDrop={(e) => handleDrop(e, column.id)}
        >
            <ColumnHeader headerTitle={column.title} headerCount={column?.cards?.length} />

            <div className="column-content">
                {column.cards.map(card => {
                    const cardCallbacks = {
                        handleDragStart: (e) => handleDragStart(e, card, column.id),
                        handleDragEnd: handleDragEnd
                    };
                    return (
                        <Card
                            key={card.id}
                            cardKey={card.id}
                            column={column}
                            card={card}
                            callbacks={cardCallbacks}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ColumnWrapper;