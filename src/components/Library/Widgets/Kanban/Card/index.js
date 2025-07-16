/**
 *  This component renders individual cards in the Kanban board,
    including basic drag-and-drop functionality. It can be extended to include more features like editing, deleting, etc.
 * @typedef {Object} CardProps
 * @property {Object} column - The column object that contains this card
 * @property {Object} card - The card data to be displayed
 * @property {Object} callbacks - Callback functions for card interactions
 */
const Card = (props) => {
    const {
        cardKey,
        card: { content },
        callbacks
    } = props;

    const { handleDragEnd, handleDragStart } = callbacks;

    const cardWrapper = (
        <div
            key={cardKey}
            className="kanban-card"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {content}
        </div>
    );
    return cardWrapper;
};
export default Card;