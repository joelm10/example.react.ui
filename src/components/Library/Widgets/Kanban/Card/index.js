import React from 'react';
import logger from 'helpers/utils/logging';
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
        callbacks = {}
    } = props;

    const { handleDragEnd, handleDragStart } = callbacks;
    // TODO: move to a separate utility function or hook if needed
    // This function can be extended to handle different types of content
    // and to include more complex rendering logic if necessary.
    const parseContent = (content) => {
        // This function can be extended to parse different types of content
        if (typeof content === 'string') {
            return <div className="kanban-card">{content}</div>;
        } else if (React.isValidElement(content)) {
            return content;
        } else if (typeof content !== 'string' && !React.isValidElement(content)) {
            logger('error', 'Invalid content type for card:', content);
            return (
                <div className="kanban-card error">
                    Invalid content: {typeof content}
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>
                        {JSON.stringify(content, null, 2)}
                    </pre>
                </div>
            );
        };

        // Validate content before rendering
        if (content === null || content === undefined) {
            logger('warn', 'Card content is null or undefined');
            return <div className="kanban-card empty">No content</div>;
        }
    }

    const validatedContent = parseContent(content);
    const cardWrapper = (
        <div
            data-id={cardKey}
            className="kanban-card"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {validatedContent}
        </div>
    );
    return cardWrapper;
};
export default Card;