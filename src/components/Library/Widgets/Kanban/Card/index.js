import React from 'react';
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
    // TODO: move to a separate utility function or hook if needed
    // This function can be extended to handle different types of content
    // and to include more complex rendering logic if necessary.
    const parseContent = (content) => {
        // This function can be extended to parse different types of content
        if (typeof content === 'string') {
            return <div className="content">{content}</div>;
        } else if (React.isValidElement(content)) {
            return content;
        } else {
            console.warn('Unsupported content type:', content);
            return <div className="content">Unsupported content</div>;
        }
    };
    // Validate content before rendering
    if (!content) {
        console.warn('Card content is empty or undefined');
        return <div className="kanban-card empty">No content</div>;
    }
    if (typeof content !== 'string' && !React.isValidElement(content)) {
        console.error('Invalid content type for card:', content);
        return <div className="kanban-card error">Invalid content</div>;
    }
    const validatedContent = parseContent(content);
    const cardWrapper = (
        <div
            key={cardKey}
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