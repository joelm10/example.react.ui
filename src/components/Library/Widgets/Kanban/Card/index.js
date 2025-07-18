import generateCardMarkup from './generator';
import defaultSchema from '../config/schema/cardSchema';
import '../styles/card.css';

/**
 *  This component renders individual cards in the Kanban board,
    including basic drag-and-drop functionality. It can be extended to include more features like editing, deleting, etc.
    renders content based on the provided card data and schema.
 *  It uses the generateCardMarkup function to create the card's content based on the schema.
 *  The card can be dragged and dropped within the Kanban board.
 *  @param {Object} props - The properties passed to the Card component.
 *  @param {string} props.cardKey - The unique key for the card.
 *  @param {Object} props.card - The card data to be displayed.
 *  @param {Object} props.callbacks - Callback functions for card interactions, such as drag start and dragend.
 *  @returns {JSX.Element} The rendered card component.
 *  @example                    
 *  <Card
 *     cardKey="card-1"
 *     card={{ summary: "Task 1", description: "Description of Task 1" }}
 *     callbacks={{
 *       handleDragStart: (e) => console.log('Drag started', e),
 *       handleDragEnd: (e) => console.log('Drag ended', e)
 *     }}
 * />
 */
const Card = (props) => {
    const {
        cardKey,
        card,
        callbacks = {},
        cardSchema = defaultSchema
    } = props;

    const { handleDragEnd, handleDragStart } = callbacks;
    const newContent = generateCardMarkup(card, cardSchema);

    const cardWrapper = (
        <div
            data-id={cardKey}
            className="kanban-card"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {newContent}
        </div>
    );
    return cardWrapper;
};
export default Card;